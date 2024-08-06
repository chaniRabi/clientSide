

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { addOrder, updateOrderStatus, deleteOrder, setOrders } from '../../features/ordersSlice';
import { GetOrder } from '../../utils/order';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

//דף ראשי המציג סיכומים וסטטיסטיקות כלליות על החנות והמכירות
const Dashboard = () => {
  const dispatch = useDispatch();
  //  const products = useSelector(state => state.products.products);
  const orders = useSelector(state => state.orders.orders);

  const GetOrderList = async () => {
    const data = await GetOrder();
    dispatch(setOrders(data));
  }
  useEffect(() => {
    GetOrderList();
  }, [dispatch, orders.length]);

  if (orders?.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ p: 4 }}>
        <CircularProgress size={30} sx={{ mr: 5 }} />
        <Typography variant="h4" sx={{ mr: 5 }}>טוען הזמנות</Typography>
      </Box>
    );
  }

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

        {/* <Grid item xs={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Products
              </Typography>
              <Button variant="contained" color="primary" onClick={handleAddProduct}>
                Add Product
              </Button>
              {products??products.map(product => (
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
          </Grid> */}

        <Grid item xs={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              הזמנות
            </Typography>
            {/* <Button variant="contained" color="primary" onClick={handleAddOrder}>
              הוסף הזמנה
            </Button> */}
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>שם לקוח</TableCell>
                    <TableCell>תאריך</TableCell>
                    <TableCell>סה"כ</TableCell>
                    <TableCell>פעולות</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        {/* {orders.map(order => (
              <Box key={order.id} sx={{ marginTop: 2 }}>
                <Typography>Order #{order.id}</Typography> */}
                        <Button variant="outlined" color="secondary" onClick={() => handleDeleteOrder(order.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;