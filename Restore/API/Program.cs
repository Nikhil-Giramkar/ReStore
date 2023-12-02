using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//Here we add dependancy injections
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Register DbContext service and pass Default connection string as DbContext option
//As required in StoreContext.cs
builder.Services.AddDbContext<StoreContext>(options => {
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnectionString"));
});

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
//Here we add middlewares

// app.UseDeveloperExceptionPage();
// This is the middleware which is at the top and is responsible for throwing any server side errors
// Before .NET6, it used to be present in this file but in later versions, Microsoft decided to minimalize the
// Boiler plate code and add this middleware in background, hence it does exist, but we donot see it here.

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection(); //Will not use this for dev, will use this in Production, hence commented

app.UseCors(opt => {
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    //Any Header, Any method - GET,PUT,POST,DELETE
    //Only from localhost:3000 (our frontend app)
});

app.UseAuthorization(); //For Auth

app.MapControllers(); //For mapping request to correct controller

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try{
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch(Exception ex){
    logger.LogError(ex, "A problem occurred during migration");
}
app.Run(); //Terminal middleware
