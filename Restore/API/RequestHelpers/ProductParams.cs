using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        //We generally do not add more than 3 arguments in any method
        // If we have a lot of argumnets, its better to put them in an object, hence created this class

        //We will extend this class from PaginationParams, so it has other props like PageSize and PageNumber added implicitly
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
        public string Brands { get; set; }
        public string Types { get; set; }        
    }
}