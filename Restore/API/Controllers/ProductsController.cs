using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
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
        public async Task<ActionResult<PagedList<Product>>> GetProducts(ProductParams productParams)
        {
            //Fetches list of products from store.db > Products table
            //return await _context.Products.ToListAsync();

            var query = _context.Products
                        .Sort(productParams.OrderBy) //our custom Sort method
                        .Search(productParams.SearchTerm) //our custom Search method
                        .Filter(productParams.Brands, productParams.Types) //our custome Filter method
                        .AsQueryable();

            
            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.Headers.Add("Pagination", JsonSerializer.Serialize(products.MetaData));

            return products;
        }

        [HttpGet("{id}")] //api/products/3
        public async Task<ActionResult<Product>> GetProduct(int id){

            var product =  await _context.Products.FindAsync(id);

            if(product == null) return NotFound();

            return product;
        }
    }
}