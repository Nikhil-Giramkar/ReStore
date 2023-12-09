using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
namespace API.Controllers
{

    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        //We did not pluralise the name of controller, as each user will fetch only one basket.

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            Basket basket = await RetrieveBasket();
            if (basket == null)
                return NotFound();

            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO{
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Quantity = item.Quantity,
                }).ToList()
            };
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket();
            if (basket == null)
            {
                //Create basket, if no basket already
                basket = CreateBasket();
            }
            
            //get product
            var product = await _context.Products.FindAsync(productId);
            if(product == null)
                return NotFound();

            //add item
            basket.AddItem(product, quantity);
            //EF will keep track of added product in basket 

            //save changes
            var result = await _context.SaveChangesAsync() > 0;

            if(result) 
                return StatusCode(201);
            
            return BadRequest(new ProblemDetails{
                Title = "Prblem in saving product to basket"
            });

        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //Get Basket
            //Remove item or reduce quantity
            //Save Cahnges
            return Ok();
        }

        private async Task<Basket> RetrieveBasket()
        {
            var basket = await _context.Baskets
                                                .Include(i => i.Items) //This is needed to include the basket items
                                                .ThenInclude(p => p.Product) //Basket Item has relation with products, so need to include products as well
                                                .FirstOrDefaultAsync(x =>
                                                            x.BuyerId == Request.Cookies["buyerId"]); //We will fetc the buyerId from User's cookie stored in his browser.
            return basket;
        }

        private Basket CreateBasket()
        {
            //To create a basket, we will generate a buyerId for the user
            var buyerId = Guid.NewGuid().ToString();
            //there is europian policy, which allow a user to either accept or decline a cookie.
            //But for our app to function properly, w need this cookie,
            //So we  will mark it as Essential :  true
            var cookieOptions = new CookieOptions{
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30) //expiry of 30 days
            };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            //Send abuyerId to the user as response, to store in cookie
            //So we can uniquely identify this user for net 30days.

            var basket = new Basket{
                BuyerId = buyerId,
                //Basket's Id will be autogenerated by EF
                //List of BasketItems already initialized
            };

            //Tell DB about new basket created
            _context.Baskets.Add(basket);

            return basket;
        }

    }
}