export interface Product {
    id: number
    name: string
    description: string
    price: number
    pictureUrl: string
    type: string
    brand: string
    quantityInStock: number
}

export interface ProductParams{
    orderBy: string, //defaukt initial state = 'name'
    searchTerm?: string, //optional
    types: string[], //optional
    brands: string[], //optional
    pageNumber: number,
    pageSize: number,

}