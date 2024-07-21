


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';
import { Button, Typography, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AddProductToCart } from '../../utils/productInCart';

const Product = ({ id, name }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // public int Id { get; set; }

  // public int? Amount { get; set; }
 
  // public int CustomerId { get; set; }
 
  // public int ProductId { get; set; }
 
  // public virtual UserDTO Customer { get; set; } = null!;

  const handleAddToCart = () => {
    const productInCart = {
      amount: quantity,
      customerId: 
    }
    AddProductToCart()
    dispatch(addToCart({ id, name, quantity }));
  };

  return (
    <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2, textAlign: 'center', maxWidth: 300 }}>
      <Typography variant="h6">{name}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
        <IconButton onClick={decreaseQuantity}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="body1" sx={{ mx: 2 }}>{quantity}</Typography>
        <IconButton onClick={increaseQuantity}>
          <AddIcon />
        </IconButton>
      </Box>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddToCart}>
      הוסף לסל 
      </Button>
    </Box>
  );
};

export default Product;
