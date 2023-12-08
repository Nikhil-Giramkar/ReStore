
using System.Text;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        //This will initialze a list of basketItems soon as Basket is initialized   

        public void AddItem(Product product, int quanity){

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);

            if(existingItem !=null){
                existingItem.Quantity += quanity;
            }

            if(Items.All(item => product.Id != item.ProductId)){
                //If none of the basket utems match the new product,
                //That means, product is new

                Items.Add(new BasketItem{
                    Product = product,
                    Quantity = quanity,
                });
            }
        }

        public void RemoveItem(Product product, int quanity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if(item == null)
                return;
            item.Quantity -= quanity;
            if(item.Quantity == 0){
                Items.Remove(item);
            }
        }
    }
}