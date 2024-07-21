


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, editProduct, deleteProduct } from '../features/productsSlice';
import { Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductManagement = () => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleEditProduct = (product) => {
    dispatch(editProduct(product));
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <h2>ניהול מוצרים</h2>
      <TextField label="Product Name" variant="outlined" />
      <Button onClick={() => handleAddProduct({ id: Date.now(), name: 'מוצר חדש' })}>הוסף מוצר</Button>
      <List>
        {products.map(product => (
          <ListItem key={product.id}>
            <ListItemText primary={product.name} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(product.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ProductManagement;
