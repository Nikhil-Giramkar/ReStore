using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.Username);
            if(user==null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
                return Unauthorized();

            var userBasket  = await RetrieveBasket(loginDTO.Username);
            var anonymousBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            if(anonymousBasket!=null)
            {
                if(userBasket!=null){
                    //in case we have anonymous basket before loging in and a user basket is also there
                    //The anonymous basket should be taken and user basket must get deleted
                    _context.Baskets.Remove(userBasket);
                }

                anonymousBasket.BuyerId = user.UserName; //anonymous basket assigned to logged in user
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            return new UserDTO{
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = anonymousBasket != null ? anonymousBasket.MapBasketToBasketDTO() : userBasket?.MapBasketToBasketDTO()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO registerDTO)
        {
            var user = new User{
                UserName = registerDTO.Username,
                Email = registerDTO.Email
            };

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if(!result.Succeeded)
            {
                foreach(var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userBasket = await RetrieveBasket(User.Identity.Name);

            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = userBasket?.MapBasketToBasketDTO()
            };
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                //if buyerId or user's name is not found, no basket can be retrieved
                //Delete the cookie if it exists and return null
                Response.Cookies.Delete("buyerId");
                return null;
            }

            var basket = await _context.Baskets
                        .Include(i => i.Items) //This is needed to include the basket items
                        .ThenInclude(p => p.Product) //Basket Item has relation with products, so need to include products as well
                        .FirstOrDefaultAsync(x => x.BuyerId == buyerId); //We will fetc the buyerId from User's cookie stored in his browser.
            return basket;
        }

    }
}