import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    return (
        <>
            <List>
                {products.map((product) => ( //Map function to add li tag to each item
                    <ProductCard key={product.id} product={product} />
                ))}
            </List>
        </>
    );
}