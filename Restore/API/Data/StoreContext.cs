using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using API.Entities.OrderAggregate;

namespace API.Data
{
    //This represents Database as it extends DbContext class
    public class StoreContext : IdentityDbContext<User, Role, int>
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

            builder.Entity<User>()
                .HasOne(a => a.Address) //Defining 1 to 1 relation between User and Address
                .WithOne()
                .HasForeignKey<UserAddress>(a => a.Id) //UserAddress.Id is foreignKey
                .OnDelete(DeleteBehavior.Cascade); //When User deleted, UserAddress should also be deleted.

            builder.Entity<Role>()
                .HasData(
                    new Role{Id = 1, Name="Member", NormalizedName= "MEMBER"},
                    new Role{Id = 2, Name="Admin", NormalizedName= "ADMIN"}
                );
        }
    }
}