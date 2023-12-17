import { useEffect  } from "react";
import ProductList from "./ProductList";

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispactch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export function Catalog() {

    //Initializing products state, with an array of objects
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispactch();


    //UseEffect 
    useEffect(() => {
        if(!productsLoaded){
            dispatch(fetchProductsAsync());
        }
    }, [productsLoaded, dispatch]) 

        if(status.includes('pending')) return <LoadingComponent message="Loading Catalog..." />
    return (
        <>
            <ProductList products={products} />
        </>
    )
}