import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/Product";

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={product.pictureUrl} />
                </ListItemAvatar>
                <ListItemText>
                    {product.name} - {product.price}
                </ListItemText>
            </ListItem>
        </>
    )
}