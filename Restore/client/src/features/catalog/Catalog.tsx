import React, { useEffect } from "react";
import { Product } from "../../app/models/Product"
import ProductList from "./ProductList";

export function Catalog() {

    //Initializing products state, with an array of objects
    const [products, setProducts] = React.useState<Product[]>([])

    //UseEffect 
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json()) //promise returned
            .then(data => setProducts(data)); //promise returned -> state initialized
    }
        , []) //Adding an empty depenedancy array, so that we fetch data only once when app loads, else we will be trapped in endless loop

    return (
        <>
            <ProductList products={products} />
        </>
    )
}