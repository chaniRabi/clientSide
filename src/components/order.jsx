

import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Order = () => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        ההזמנות שלי:
      </Typography>
      <Grid container spacing={4}>
        {orders.map((order) => (
          <Grid item key={order.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  מוצר: {order.product}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  כמות: {order.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  מחיר: ש"ח{order.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Order;
