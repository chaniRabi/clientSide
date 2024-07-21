



import React from 'react';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import useCart from './oldComponent/useCart';

const CartIcon = () => {
  // const cart = useSelector(state => state.cart.items|| []); // או לפי המבנה של ה-state שלך
  const productsInCart = useSelector(state => state.cart.items)    //בשביל לזהות אם המוצר קיים כבר בעגלה

  return (
    <>
      {/* <IconButton color="inherit">
        <Badge badgeContent={items} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton> */}
      <IconButton aria-label="cart" style={{ color: 'white' }}>
        <Badge badgeContent={productsInCart?.reduce((acc, item) => acc + (item.productInCarts[0]?.amount), 0)} color="secondary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>
    </>
  );
};

export default CartIcon;
