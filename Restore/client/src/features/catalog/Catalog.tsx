import { Button} from "@mui/material";
import { Product } from "../../app/models/Product"
import ProductList from "./ProductList";

interface Props {
    products: Product[]; //products is an array of type Product
    addProduct: () => void; // addProduct is a method with no parameter and void return type
}

export function Catalog({products, addProduct}: Props) {
    return (
        <>
            <ProductList products={products}/>
            <Button variant='contained' onClick={addProduct}>Add Product</Button>

        </>
    )
}