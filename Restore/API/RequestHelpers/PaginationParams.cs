namespace API.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1; //default value

        private int _pageSize = 6; //By default 6 products will be shown at once, it can be overrden, when set from Frontend
        public int PageSize
        {
            get { return _pageSize; }
            set 
            {
                _pageSize = value > MaxPageSize ? MaxPageSize : value;
                //If user wants less than 50 products at once, then its okay, but if user asks more
                //We will cap its limit to MaxPageSize 
            }
        }
        
    }
}