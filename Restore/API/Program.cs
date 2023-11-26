var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//Here we add dependancy injections
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//Here we add middlewares
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection(); //Will not use this for dev, will use this in Production, hence commented

app.UseAuthorization(); //For Auth

app.MapControllers(); //For mapping request to correct controller

app.Run(); //Terminal middleware
