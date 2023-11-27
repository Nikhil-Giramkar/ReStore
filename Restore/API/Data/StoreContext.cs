using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    //This represents Database as it extends DbContext class
    public class StoreContext : DbContext
    {
        //Constructor
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        //DbSets are tables in DB
        public DbSet<Product> Products { get; set; }
    }
}