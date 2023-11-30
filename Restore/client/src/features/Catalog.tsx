import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../app/models/Product"

interface Props {
    products: Product[]; //products is an array of type Product
    addProduct: () => void; // addProduct is a method with no parameter and void return type
}

export function Catalog({products, addProduct}: Props) {
    return (
        <>
            <List>
                {products.map((product) => ( //Map function to add li tag to each item
                    <ListItem key={product.id}>
                    <ListItemAvatar>
                        <Avatar src={product.pictureUrl} />
                    </ListItemAvatar>
                    <ListItemText>
                    {product.name} - {product.price}
                    </ListItemText>
                    </ListItem> 
                ))}
            </List>


            <Button variant='contained' onClick={addProduct}>Add Product</Button>

        </>
    )
}