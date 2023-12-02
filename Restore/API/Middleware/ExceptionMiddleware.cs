
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _environment;

        public ExceptionMiddleware(RequestDelegate next, 
            ILogger<ExceptionMiddleware> logger, IHostEnvironment environment)
        {
            _next = next;
            _logger = logger;
            _environment = environment;
        }

        //A compulsory menthod in any middleware
        public async Task InvokeAsync(HttpContext context){
            try{
                await _next(context);  //If no errors found, go to next middleware
            }
            catch(Exception ex){
                _logger.LogError(ex, ex.Message);
                //Since we are nt inside Api controller,
                //We need to specify all detauil like content type, status code, etc.
                //To display exception via endpoints

                context.Response.ContentType = "application/json"; 
                context.Response.StatusCode = 500;

                var response  = new ProblemDetails{
                    Status = 500,
                    Detail = _environment.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                    //In development mode, show full stack trace else no details
                    Title = ex.Message
                };

                //When our API controller returns a JSON response, it uses Camel Case, but
                //Middleware is not a part of controllers, so we loose certain defaults, hence need to 
                //Explicitly specify to use Camel Case

                var options =  new JsonSerializerOptions{
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                var jsonResponse = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(jsonResponse);

            }
        }
    }
}