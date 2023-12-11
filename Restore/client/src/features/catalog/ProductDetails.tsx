import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/Product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails() {
    //debugger;

    const { basket } = useStoreContext();

    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    //We may or may not receive a product from backend hence default value and type is null

    const [loading, setLoading] = useState(true); //Loading flag to show that we are fetching data

    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {

        if (item)
            setQuantity(item.quantity);

        id && agent.Catalog.details(parseInt(id)).
            then(product => setProduct(product))
            .catch(error => console.log(error))
            .finally(() => setLoading(false)) //Set Loading flag false

    }, [id, item])//Everytime the id changes, fetch the data again

    if (loading) return <LoadingComponent message="Loading Product..." />

    if (!product) return <NotFound />

    return (
        <>
            <Grid container spacing={6} >
                <Grid item xs={6}>
                    <img src={product.pictureUrl}
                        alt={product.name}
                        style={{ width: '100%' }} />
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="h3">{product.name}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="h4" color='secondary'>Rs.{(product.price / 100).toFixed(2)}</Typography>

                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{product.type}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Quantity In Stock</TableCell>
                                    <TableCell>{product.quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                type="number"
                                label='Quntity in cart'
                                fullWidth
                                value={quantity}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <LoadingButton
                                sx={{ height: '55px' }}
                                color="primary"
                                size="large"
                                variant="contained"
                                fullWidth
                            >
                                {item ? 'Update Quantity' : 'Add to Cart'}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}