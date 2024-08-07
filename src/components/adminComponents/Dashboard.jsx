

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { addOrder, updateOrderStatus, deleteOrder, setOrders, setStatus } from '../../features/ordersSlice';
import { GetOrder, UpdateOrder } from '../../utils/order';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { GetAllStatus } from '../../utils/lookupUtil';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdminEditProductDialog from './AdminEditProductDialog';

//דף ראשי המציג סיכומים וסטטיסטיקות כלליות על החנות והמכירות
const Dashboard = () => {
  const dispatch = useDispatch();
  //  const products = useSelector(state => state.products.products);
  const orders = useSelector(state => state.orders.orders);
  const status = useSelector(state => state.orders.status);
  const [open, setOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleClose = () => {
    setOpen(false);
  }

  const GetOrderList = async () => {
    const data = await GetOrder();
    dispatch(setOrders(data));
  }

  const GetStatus = async () => {
    const data = await GetAllStatus();
    dispatch(setStatus(data));
  }

  useEffect(() => {
    GetOrderList();
    GetStatus();
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

  const handleChangeStatus = (e, order) => {
    let _order = {...order};
    let statusId = e.target.value;
    _order.statusId = statusId;
    UpdateOrder(_order.id, _order).then(res => {
      if(res.status){
        dispatch(updateOrderStatus(_order));
      }
    })
  }

  const handleDetailsOrder = (order) => {
    setOrderDetails(order);
    setOpen(true);
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      {open && <AdminEditProductDialog open={open} handleClose={handleClose} order={orderDetails}/>}
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
                    <TableCell>סטטוס הזמנה</TableCell>
                    <TableCell>לצפיה בהזמנה</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.totalCost}</TableCell>
                      <TableCell>
                        {/* {orders.map(order => (
              <Box key={order.id} sx={{ marginTop: 2 }}>
                <Typography>Order #{order.id}</Typography> */}
                        {/* <Button variant="outlined" color="secondary" onClick={() => handleDeleteOrder(order.id)}>
                          Delete
                        </Button> */}
                        <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={order.statusId}
                    // defaultChecked={order.statusId}
                    onChange={(e) => handleChangeStatus(e, order)}
                  >
                    {
                      status.map((statusItem)=>{
                        return <MenuItem key={statusItem.id} value={statusItem.id}>{statusItem.description}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                      </TableCell>
                       <Button variant="outlined" color="secondary" onClick={() => handleDetailsOrder(order)}>
                          לצפיה בהזמנה
                        </Button>
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