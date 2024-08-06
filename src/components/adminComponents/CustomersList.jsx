

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { fetchCustomers, deleteCustomer } from '../../features/customersSlice';
import { GetUsers  } from '../../utils/usersAPI'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CustomersList = () => {
  const dispatch = useDispatch();
  const customers = useSelector(state => state.customers.customers);

  const loadCustomers = async () => {
    const data = await GetUsers();
    dispatch(fetchCustomers(data));
  }

  useEffect(() => {
    loadCustomers();
  }, [dispatch]);

  if (!customers) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ p: 4 }}>
        <CircularProgress size={30} sx={{ mr: 5 }} />
        <Typography variant="h4" sx={{ mr: 5 }}>טוען לקוחות</Typography>
      </Box>
    );
  }

  const handleDeleteCustomer = (id) => {
    dispatch(deleteCustomer(id));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            לקוחות
          </Typography>
          <Paper sx={{ padding: 2 }}>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>שם</TableCell>
                    <TableCell>אימייל</TableCell>
                    <TableCell>טלפון</TableCell>
                    <TableCell>כתובת</TableCell>
                    <TableCell>פעולות</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>
                        <Button variant="outlined" color="secondary" onClick={() => handleDeleteCustomer(customer.id)}>
                          מחק
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

export default CustomersList;
