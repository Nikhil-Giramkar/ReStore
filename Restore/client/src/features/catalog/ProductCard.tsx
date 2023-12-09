import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/Product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const[loading, setLoading] = useState(false);

    function handleAddItem(productId: number){
        setLoading(true);
        agent.Basket.addItem(productId)
                    .catch(error => console.log(error))
                    .finally(()=> setLoading(false));
    }

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
                        Rs.{(product.price / 100).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.brand} / {product.type}
                    </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton size="small"
                                    loading={loading}
                                    onClick={() => handleAddItem(product.id)}
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