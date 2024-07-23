

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Button, Typography, Paper } from '@mui/material';
import {addOrder, updateOrderStatus, deleteOrder } from '../../features/ordersSlice';
import {addProduct, editProduct, deleteProduct } from '../../features/productsSlice';

//דף ראשי המציג סיכומים וסטטיסטיקות כלליות על החנות והמכירות
const Dashboard = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const orders = useSelector(state => state.orders.orders);
  
    const handleAddProduct = () => {
      // Add product logic
    };
  
    const handleDeleteProduct = (id) => {
      dispatch(deleteProduct(id));
    };
  
    const handleEditProduct = (product) => {
      // Edit product logic
    };
  
    const handleAddOrder = () => {
      // Add order logic
    };
  
    const handleDeleteOrder = (id) => {
      dispatch(deleteOrder(id));
    };
  
    return (
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              דף ראשי
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Products
              </Typography>
              <Button variant="contained" color="primary" onClick={handleAddProduct}>
                Add Product
              </Button>
              {products.map(product => (
                <Box key={product.id} sx={{ marginTop: 2 }}>
                  <Typography>{product.name}</Typography>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => handleEditProduct(product)}>
                    Edit
                  </Button>
                </Box>
              ))}
            </Paper>
          </Grid>
  
          <Grid item xs={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Orders
              </Typography>
              <Button variant="contained" color="primary" onClick={handleAddOrder}>
                Add Order
              </Button>
              {orders.map(order => (
                <Box key={order.id} sx={{ marginTop: 2 }}>
                  <Typography>Order #{order.id}</Typography>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteOrder(order.id)}>
                    Delete
                  </Button>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default Dashboard;