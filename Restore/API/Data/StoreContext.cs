using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using API.Entities.OrderAggregate;

namespace API.Data
{
    //This represents Database as it extends DbContext class
    public class StoreContext : IdentityDbContext<User>
    {
        //Constructor
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        //DbSets are tables in DB
        public DbSet<Product> Products { get; set; }

        public DbSet<Basket> Baskets {get; set;}
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole{Name="Member", NormalizedName= "MEMBER"},
                    new IdentityRole{Name="Admin", NormalizedName= "ADMIN"}
                );
        }
    }
}