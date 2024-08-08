
//עמוד סיום רכישה

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import { clearCart } from '../actions/cartActions';

import { Paper, Typography, Box, Grid, Button } from "@mui/material";
import { CLEAR_CART } from '../../features/productInCartSlice';
import { useNavigate } from 'react-router-dom';
import { getTotal } from '../../productHelpers';

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
  // const cart = useSelector(state => state.cart);
  const cart = useSelector(state => state.cart.items)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(state => state.product.products);



  const handleCheckout = () => {
    // Handle checkout logic here
    // For example: send order to server, clear cart, etc.
    dispatch(CLEAR_CART());
    alert('תודה לך על שרכשת אצלנו!');
  };

  const total = getTotal(products, cart)


  return (
    <Paper>
      <Typography variant="h5" component="h3">
        סיום רכישה
      </Typography>
      <Typography variant="body1">
        סה"כ פריטים: {cart?.length}
      </Typography>
      <Typography >
          סה"כ לתשלום: {total} ש"ח
        </Typography>
      {/* Add more checkout details like shipping address, payment method, etc. */}
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
      >
        אשר הזמנה
      </Button> */}
      <Button variant="contained" onClick={() => navigate('/payment')}>לביצוע התשלום</Button>

    </Paper>
  );
};

export default CheckoutPage;