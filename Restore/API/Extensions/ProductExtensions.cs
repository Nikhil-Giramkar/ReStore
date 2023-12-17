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

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();

            if(!string.IsNullOrEmpty(brands))
                brandList.AddRange(brands.ToLower().Split(",").ToList());
                //Add all brands as list split by comma and converted to lower case

            if(!string.IsNullOrEmpty(types))
                typeList.AddRange(types.ToLower().Split(",").ToList());


            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));
            
            //If brandlist or typelist are empty, do not perform any action
            //If count==0, second statement after || will not be evaluated, since if first stmt is True in case of OR
            //Second stmt is ignored
            //if first stmt is false, then second stmt of OR goes for evaluation
            
            return query;

        }
    }
}