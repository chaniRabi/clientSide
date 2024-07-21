


import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {incrementQuantity, decrementQuantity } from '../features/cartSlice';

export default function ProductAddToCart({ onClick, show, variant, children }) {
//   const [quantity, setQuantity] = useState(1);
const dispatch = useDispatch();
const quantity = useSelector((state) => state.cart.quantity);

const handleIncrement = () => {
    dispatch(incrementQuantity());
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity());
  };

  const handleAddToCart = () => {
    onClick(quantity);
  };


//   const handleIncrement = () => {
//     setQuantity(quantity + 1);
//   };

//   const handleDecrement = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleAddToCart = () => {
//     onClick(quantity);
//   };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {show && (
        <ButtonGroup size="small" variant="outlined" style={{ marginRight: 8 }}>
          <Button onClick={handleDecrement}>-</Button>
          <Button disabled>{quantity}</Button>
          <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
      )}
      <Button variant={variant} onClick={handleAddToCart}>
        {children}
      </Button>
    </div>
  );
}
