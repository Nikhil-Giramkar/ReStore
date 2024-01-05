using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser<int>
    { 
        //Don't need to add any properies like username, email, phone, etc 
        //as they are already present in definition of parent class

        public UserAddress Address { get; set; }
    }
}