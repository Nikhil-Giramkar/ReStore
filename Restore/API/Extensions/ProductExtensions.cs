using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            //Here, we are adding a new Sort() method for IQueryable interface, 
            //since it is not provided as in=built method.

            if(string.IsNullOrWhiteSpace(orderBy))
                return query.OrderBy(p => p.Name); //Sort by name, when no orderBy parameter

            query = orderBy switch {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p=> p.Price),
                _ => query.OrderBy(p=> p.Name),
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if(string.IsNullOrWhiteSpace(searchTerm))
                return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();


            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }
    }
}