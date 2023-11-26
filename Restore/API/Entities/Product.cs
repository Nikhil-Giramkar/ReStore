namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; } //Used long data type due to the payment provider we are going to use.
        //Suppose price is $100.00, we will store it as 10000 in DB
        //We wil format it by left shifting decimal for UI

        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public int QuantityInStock { get; set; }
    }
}