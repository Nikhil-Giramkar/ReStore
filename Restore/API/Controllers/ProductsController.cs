using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(
            string orderBy, string searchTerm)
        {
            //Fetches list of products from store.db > Products table
            //return await _context.Products.ToListAsync();

            var query = _context.Products
                        .Sort(orderBy) //our custom Sort method
                        .Search(searchTerm) //our custom Search method
                        .AsQueryable();

            

            return await query.ToListAsync();

        }

        [HttpGet("{id}")] //api/products/3
        public async Task<ActionResult<Product>> GetProduct(int id){

            var product =  await _context.Products.FindAsync(id);

            if(product == null) return NotFound();

            return product;
        }
    }
}