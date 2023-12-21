import {Grid } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    const {productsLoaded} = useAppSelector(state => state.catalog);

    return (
        <>
            <Grid container spacing={4}> 
                {products.map((product) => ( //Map function to add li tag to each item
                    <Grid item xs={4}  // Out of 12 columns of grid, one item will take 3, so total 4 cards in one row
                        key={product.id}>
                            {productsLoaded 
                            ? (<ProductCard product={product} />)
                            : (<ProductCardSkeleton/>)}
                        
                    </Grid>
                    
                ))}
            </Grid>
        </>
    );
}