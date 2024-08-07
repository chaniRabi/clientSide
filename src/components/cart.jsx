

import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { registerUser } from "../utils/usersAPI";
import { RemoveProductFromCart, GetProductsInCartByUserId, ClearCart } from "../utils/productInCart";
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ADD_ITEM, REMOVE_ITEM, SET_LOGGED_PRODUCTINCART, CLEAR_CART } from '../features/productInCartSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getProductById, getTotal } from '../productHelpers';
import EmptyCartMessage from './EmptyCartMessage';


const Cart = () => {
  
  const dispatch = useDispatch();//בשביל עדכון הסטייט
  const loggedUser = useSelector(state => state.user.logedUser);//בשביל שימוש מהסלייס - לזהות את המשתמש ונלקח מסלייס
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.items)    // בשביל לזהות אם המוצר קיים כבר בעגלה
  const products = useSelector(state => state.product.products);

  // const removeFromCart = (productId) => {
  //   RemoveProductFromCart(productId).then(res => {
  //     const newCart = cart.filter((item) => item.productInCarts[0].id !== productId);
  //     setCart(newCart);
  //   });
  // };

  const removeFromCart = (productInCartId) => {
    Swal.fire({
      title: "בטוח להסיר את המוצר מהעגלה?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c1b54",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, הסר את המוצר!"
    }).then((result) => {
      if (result.isConfirmed) {
        RemoveProductFromCart(productInCartId).then(res => {
          dispatch(REMOVE_ITEM(productInCartId));
          Swal.fire({
            title: "מחיקה מהסל!",
            text: "המוצר הוסר מהעגלה!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        });
      }
    });
  };


  //פונקציה שתמחק את כל המוצרים בסל יחד:
  // const handelClearCart = () => {
  //   ClearCart(loggedUser.id).then(res => setCart([]))
  // };
  const handelClearCart = () => {
    Swal.fire({
      title: "בטוח למחוק את כל העגלה?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, נקה את העגלה!"
    }).then((result) => {
      if (result.isConfirmed) {
        ClearCart(loggedUser.id).then(res => {
          dispatch(CLEAR_CART())
          Swal.fire({
            title: "בוצע בהצלחה",
            text: "העגלה שלך ריקה!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        });
      }
    });
  };

  const total = getTotal(products, cart)

  return (
    <Card >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          סל קניות:
        </Typography>
        {cart.length ? (<List>
          {cart.map(item => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={item.product?.name}
                  secondary={`כמות: ${item.amount} | מחיר: ${(item.product?.price) * item.amount} ש"ח`}
                  // secondary={`${item.price} ש"ח`}
                  sx={{ ml: 2, textAlign:'right' }}
                />
                <Button variant="contained" color="secondary" onClick={() => removeFromCart(item.id)} startIcon={<DeleteIcon sx={{ ml: 1 }} />} >
                  הסר מהסל
                </Button>
                {/* <IconButton aria-label="delete" onClick={() => removeFromCart(item.id)}>
          <DeleteIcon />
        </IconButton> */}
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>):
        <EmptyCartMessage/>
        //  <div style={{height:'50px', textAlign:'center'}}>
        // <Typography>אין מוצרים בעגלה</Typography>
        // </div>
        }
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent:'end' }, gap: 2 }}>
        <Typography sx={{fontSize:'25px'}}>
          סה"כ לתשלום: {total.toFixed(2)} ש"ח
        </Typography>
        </Box>
        </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent:'end' }, gap: 2 }}>

        {cart.length ?(<><Button variant="contained" onClick={handelClearCart}>נקה את סל הקניות</Button>
        <Button variant="contained" onClick={() => navigate('/payment')}>לתשלום</Button>
        <Button variant="contained" onClick={() => navigate('/products')}>המשך בקנייה</Button></>):
        <Button variant="contained" onClick={() => navigate('/products')}>התחל בקניה</Button>}
        </Box>
      </CardActions>
    </Card>

  );
};

export default Cart;


