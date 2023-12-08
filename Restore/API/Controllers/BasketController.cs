using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<ActionResult<Basket>> GetBasket(){
            var basket = await _context.Baskets
                                    .Include(i => i.Items) //This is needed to include the basket items
                                    .ThenInclude(p => p.Product) //Basket Item has relation with products, so need to include products as well
                                    .FirstOrDefaultAsync(x => 
                                                x.BuyerId == Request.Cookies["buyerId"]); //We will fetc the buyerId from User's cookie stored in his browser.
            
            if(basket == null)
                return NotFound();

            return basket;
        }


        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity){
            //get basket
            //Create basket, if no basket already
            //get products
            //add item
            //save changes
            return StatusCode(201);
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity){
            //Get Basket
            //Remove item or reduce quantity
            //Save Cahnges
            return Ok();
        }

    }
}