
//עמוד סיום רכישה

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import { clearCart } from '../actions/cartActions';
import { Paper, Typography, Box, Grid, Button } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(2),
//     margin: 'auto',
//     maxWidth: 600,
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

const CheckoutPage = () => {
  // const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    // Handle checkout logic here
    // For example: send order to server, clear cart, etc.
    dispatch(clearCart());
    alert('Thank you for your purchase!');
  };

  return (
    <Paper>
      <Typography variant="h5" component="h3">
        Checkout
      </Typography>
      <Typography variant="body1">
        Total Items: {cart.totalItems}
      </Typography>
      <Typography variant="body1">
        Total Price: ${cart.totalPrice.toFixed(2)}
      </Typography>
      {/* Add more checkout details like shipping address, payment method, etc. */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
      >
        Confirm Order
      </Button>
    </Paper>
  );
};

export default CheckoutPage;