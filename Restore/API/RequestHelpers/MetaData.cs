namespace API.RequestHelpers
{
    public class MetaData
    {
        //Created this class to give user info about current page, total pages, after applying all filters, etc.

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
    }
}