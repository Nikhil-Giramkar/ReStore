import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

export default function BasketPage() {

  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    name: '',
    loading: false
  });

  function handleAddItem(productId: number, actionName: string) {

    setStatus({
      loading: true,
      name: actionName
    });

    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setStatus({
        loading: false,
        name: ''
      }))
  }

  function handleRemoveItem(productId: number, actionName: string, quantity = 1) {

    setStatus({
      loading: true,
      name: actionName
    });

    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(error => console.log(error))
      .finally(() => setStatus({
        loading: false,
        name: ''
      }))
  }

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
                <TableCell align="right">Rs.{(item.price / 100).toFixed(2)}</TableCell>
                <TableCell align="center">

                  <LoadingButton
                    loading={status.loading && status.name === 'rem' + item.productId}
                    color="error"
                    onClick={() => handleRemoveItem(item.productId, 'rem' + item.productId, 1)}>
                    <Remove />
                  </LoadingButton>

                  {item.quantity}

                  <LoadingButton
                    loading={status.loading && status.name === 'add' + item.productId}
                    color="secondary"
                    onClick={() => handleAddItem(item.productId, 'add' + item.productId)}>
                    <Add />
                  </LoadingButton>

                </TableCell>
                <TableCell align="right">Rs.{((item.price * item.quantity) / 100).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <LoadingButton loading={status.loading && status.name === 'del' + item.productId}
                    color="error"
                    onClick={() => handleRemoveItem(item.productId, 'del' + item.productId, item.quantity)}>
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}