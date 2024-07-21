

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import {  setPage, setcategoryId } from '../features/productsSlice';
import { Grid, CircularProgress, Alert, Pagination, TextField, Box } from '@mui/material';
import {GetProductsByCategoryId, } from "../utils/categoryAPI";
import SingleProductDesktop from "./SingleProductDesktop";

const ProductList1 = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const page = useSelector((state) => state.products.page);
  const categoryId = useSelector((state) => state.products.categoryId);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

//   useEffect(() => {
//     dispatch(fetchProducts({ page, categoryId }));
//   }, [dispatch, page, categoryId]);

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));
  };

  const handlecategoryIdChange = (event) => {
    dispatch(setcategoryId(event.target.value));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <TextField
        label="Category Code"
        value={categoryId}
        onChange={handlecategoryIdChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Grid container spacing={2} justifyContent="center">
        {products.map(product => (
          <Grid item key={product.id}>
            <SingleProductDesktop productId={product.id} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={10}  // יש לעדכן את המספר הכולל של הדפים בהתאם לנתוני ה-API
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default ProductList1;
