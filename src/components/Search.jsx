


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Box, CircularProgress, Typography, Grid, Card, CardContent } from '@mui/material';
import { setSearchTerm, searchProducts } from '../features/searchSlice';
import { useNavigate } from 'react-router-dom';
import { setSelectedCategoryId } from '../features/categoriesSlice';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ fromNavBar = false }) {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search.searchTerm);

  const [tempSearchTerm, setTempSearchTerm] = useState('')
  const navigate = useNavigate()

  const onSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(tempSearchTerm));
    dispatch(setSelectedCategoryId(-1));
    navigate('/products');
  };

  return (
    <Box component="form" sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        color='secondary'
        variant="outlined"
        label="חיפוש מוצרים"
        value={searchTerm}
        onChange={(e) => setTempSearchTerm(e.target.value)}
        sx={fromNavBar
          ? {
            mr: 2,
            '& .MuiInputLabel-root': {
              color: 'white', // change label color
            },
            '& .MuiOutlinedInput-input': {
              color: 'white', // change input text color
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white !important', // change outline border color
            },
          }
          : { mr: 2 }}
      />

      <Button variant="contained" onClick={onSearch}>
        <SearchIcon style={{ fontSize: 30 }} />
      </Button>
    </Box>
  );
}
