using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; } //Quantity of an item in basket

        //navigation properties - to create a relation between product and basket item
        public int ProductId { get; set; }
        public Product Product { get; set; }

        // A basketItem is dependant on basket
        //We must define the relation on both sides, basket and basket item as well
        public int BasketId {get; set;}
        public Basket Basket {get; set; }
    }
}