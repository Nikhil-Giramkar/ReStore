using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public IActionResult GetNotFound(){
            return NotFound();
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequest(){
            return BadRequest(new ProblemDetails{Title= "This is a Bad Request"});
        }

        [HttpGet("unauthorised")]
        public IActionResult GetUnauthorised(){
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public IActionResult GetValidationError(){
            ModelState.AddModelError("Problem 1", "This is first problem");
            ModelState.AddModelError("Problem 2", "This is first problem");
            return ValidationProblem();

        }

        [HttpGet("server-error")]
        public IActionResult GetServerError(){
            throw new Exception("This is a Server Error");
        }



    }
}