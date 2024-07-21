

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStatus } from '../features/ordersSlice';
import { Button, List, ListItem, ListItemText, Select, MenuItem } from '@mui/material';

const OrderManagement = () => {
  const orders = useSelector(state => state.orders);
  const dispatch = useDispatch();

  const handleStatusChange = (order, status) => {
    dispatch(updateOrderStatus({ ...order, status }));
  };

  return (
    <div>
      <h2>ניהול הזמנות</h2>
      <List>
        {orders.map(order => (
          <ListItem key={order.id}>
            <ListItemText primary={`Order ${order.id}`} />
            <Select
              value={order.status}
              onChange={(e) => handleStatusChange(order, e.target.value)}
            >
              <MenuItem value="Pending">בטיפול</MenuItem>
              <MenuItem value="Shipped">נשלח</MenuItem>
              <MenuItem value="Delivered">נמסר</MenuItem>
            </Select>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default OrderManagement;
