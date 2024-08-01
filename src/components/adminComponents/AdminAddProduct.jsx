
//קומפוננטה נפרדת להוסף מוצר

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/productsSlice';
import { TextField, Button, Box, Typography } from '@mui/material';


//הקומפוננטה כוללת טופס להוספת מוצר חדש, הכולל שדות לשם המוצר, מחיר ותיאור.
const AdminAddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { name, price, description };

    // שליחת הנתונים ל-Database
    try {
      const response = await fetch('/api/products', { //בעת שליחת הטופס, הקומפוננטה שולחת את הנתונים לשרת בעזרת fetch לכתובת /api/products.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const savedProduct = await response.json();
      dispatch(addProduct(savedProduct)); //אם הבקשה מצליחה, המוצר החדש נוסף לסטור

      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Failed to save the product:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', mt: 5 }}
    >
      <Typography variant="h4" component="h1" textAlign="center">הוסף מוצר</Typography>
      <TextField
        label="שם המוצר"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="מחיר"
        variant="outlined"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <TextField
        label="תיאור"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        הוסף מוצר
      </Button>
    </Box>
  );
};

export default AdminAddProduct;
