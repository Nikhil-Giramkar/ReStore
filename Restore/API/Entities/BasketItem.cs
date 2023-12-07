namespace API.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; } //Quantity of an item in basket

        //navigation properties - to create a relation between product and basket item
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}