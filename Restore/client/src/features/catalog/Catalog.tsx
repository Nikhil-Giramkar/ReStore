import React, { useEffect } from "react";
import { Product } from "../../app/models/Product"
import ProductList from "./ProductList";
import agent from "../../app/api/agent";

export function Catalog() {

    //Initializing products state, with an array of objects
    const [products, setProducts] = React.useState<Product[]>([])

    //UseEffect 
    useEffect(() => {
        agent.Catalog.list().then(products =>  setProducts(products));
    }
        , []) //Adding an empty depenedancy array, so that we fetch data only once when app loads, else we will be trapped in endless loop

    return (
        <>
            <ProductList products={products} />
        </>
    )
}