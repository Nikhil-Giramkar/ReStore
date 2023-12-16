import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, Button } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppDispactch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {

  const {basket, status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispactch();

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>

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
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.items.map((item) => (
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

                  <LoadingButton
                    loading={status.includes('pendingRemoveItem'+ item.productId)}
                    color="error"
                    onClick={() => dispatch(removeBasketItemAsync({productId: item.productId}))}>
                    <Remove />
                  </LoadingButton>

                  {item.quantity}

                  <LoadingButton
                    loading={status.includes('pendingAddItem'+ item.productId)}
                    color="secondary"
                    onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}>
                    <Add />
                  </LoadingButton>

                </TableCell>
                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                <TableCell align="right">
                  <LoadingButton loading={status.includes('pendingRemoveItem'+ item.productId)}
                    color="error"
                    onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity}))}>
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button component={Link}
            to='/checkout'
            variant="contained"
            size="large"
            fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>

    </>
  )
}