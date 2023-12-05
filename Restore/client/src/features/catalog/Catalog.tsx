import React, { useEffect, useState } from "react";
import { Product } from "../../app/models/Product"
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

export function Catalog() {

    //Initializing products state, with an array of objects
    const [products, setProducts] = React.useState<Product[]>([])
    const [loading, setLoading] = useState(true);

    //UseEffect 
    useEffect(() => {
        agent.Catalog.list().
        then(products =>  setProducts(products))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
        , []) //Adding an empty depenedancy array, so that we fetch data only once when app loads, else we will be trapped in endless loop

        if(loading) return <LoadingComponent message="Loading Catalog..." />
    return (
        <>
            <ProductList products={products} />
        </>
    )
}