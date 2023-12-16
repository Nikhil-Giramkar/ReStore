import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/Product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
// import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";
import { useAppDispactch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";
interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const{status} = useAppSelector(state => state.basket);
    //const {setBasket} = useStoreContext();

    const dispatch = useAppDispactch();

    return (
        <>
            <Card>
                <CardHeader 
                    avatar={
                        <Avatar sx={{bgcolor: 'secondary.main'}}> 
                            {product.name.charAt(0).toLocaleUpperCase()}
                        </Avatar>
                    }
                    title={product.name}
                    titleTypographyProps={{
                        sx: {fontWeight: 'bold', color: 'primary.main'}
                    }}
                />
                <CardMedia
                    sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'warning.light'}} // to fit image inside the space
                    image={product.pictureUrl}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom color='secondary' variant="h5">
                        {currencyFormat(product.price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.brand} / {product.type}
                    </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton size="small"
                                    loading={status.includes('pendingAddItem'+product.id)}
                                    onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                                    >
                        Add to Cart
                        </LoadingButton>

                    <Button component={Link}
                            to={`/catalog/${product.id}`}
                            size="small">
                        View
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}