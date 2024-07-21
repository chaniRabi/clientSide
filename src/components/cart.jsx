

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


const Cart = () => {
  // const [products, setProducts] = useState([]);
  // const [cart, setCart] = useState([]);
  const dispatch = useDispatch();//בשביל עדכון הסטייט
  const loggedUser = useSelector(state => state.user.logedUser);//בשביל שימוש מהסלייס - לזהות את המשתמש ונלקח מסלייס
  const navigate = useNavigate();
  const productsInCart = useSelector(state => state.cart.items)    // בשביל לזהות אם המוצר קיים כבר בעגלה

  console.log('loggedUser', loggedUser)

  // const removeFromCart = (productId) => {
  //   RemoveProductFromCart(productId).then(res => {
  //     const newCart = cart.filter((item) => item.productInCarts[0].id !== productId);
  //     setCart(newCart);
  //   });
  // };

  const removeFromCart = (productId) => {
    Swal.fire({
      title: "בטוח להסיר את המוצר מהעגלה?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c1b54",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, הסר את המוצר!"
    }).then((result) => {
      if (result.isConfirmed) {
        RemoveProductFromCart(productId).then(res => {
          dispatch(REMOVE_ITEM(productId));
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

  const total = productsInCart?.reduce((acc, item) => acc + (item.price * item.productInCarts[0]?.amount), 0);

  return (
    <Card >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          סל קניות:
        </Typography>
        <List>
          {productsInCart.map(item => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={`כמות: ${item.productInCarts[0].amount} | מחיר: ${item.price * item.productInCarts[0].amount} ש"ח`}
                  // secondary={`${item.price} ש"ח`}
                  sx={{ ml: 2 }}
                />
                <Button variant="contained" color="secondary" onClick={() => removeFromCart(item.productInCarts[0].id)} startIcon={<DeleteIcon sx={{ ml: 1 }} />} >
                  הסר מהסל
                </Button>
                {/* <IconButton aria-label="delete" onClick={() => removeFromCart(item.id)}>
          <DeleteIcon />
        </IconButton> */}
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Typography >
          סה"כ לתשלום: {total.toFixed(2)} ש"ח
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>

        <Button variant="contained" onClick={handelClearCart}>נקה את סל הקניות</Button>
        <Button variant="contained" onClick={() => navigate('/payment')}>לתשלום</Button>
        <Button variant="contained" onClick={() => navigate('/products')}>המשך בקנייה</Button>
        </Box>
        </CardContent>
      <CardActions>
      </CardActions>
    </Card>

  );
};

export default Cart;


