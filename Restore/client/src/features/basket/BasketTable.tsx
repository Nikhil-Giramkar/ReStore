import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { useAppSelector, useAppDispactch } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { BasketItem } from "../../app/models/Basket";

interface Props {
    items: BasketItem[],
    isBasket?: boolean
}
export default function BasketTable({ items, isBasket = true }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispactch();

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            {isBasket &&
                                <TableCell align="right"></TableCell>
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display="flex" alignItems="center">
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                                <TableCell align="center">
                                    {isBasket &&
                                        <LoadingButton
                                            loading={status === ('pendingRemoveItem' + item.productId + 'rem')}
                                            color="error"
                                            onClick={() => dispatch(
                                                removeBasketItemAsync(
                                                    { productId: item.productId, quantity: 1, name: 'rem' }))}>
                                            <Remove />
                                        </LoadingButton>
                                    }


                                    {item.quantity}
                                    {isBasket &&

                                        <LoadingButton
                                            loading={status === ('pendingAddItem' + item.productId)}
                                            color="secondary"
                                            onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}>
                                            <Add />
                                        </LoadingButton>
                                    }

                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                                {isBasket &&
                                    <TableCell align="right">
                                        <LoadingButton loading={status === ('pendingRemoveItem' + item.productId + 'del')}
                                            color="error"
                                            onClick={() => dispatch(
                                                removeBasketItemAsync(
                                                    { productId: item.productId, quantity: item.quantity, name: 'del' }))}>
                                            <Delete />
                                        </LoadingButton>
                                    </TableCell>
                                }

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}