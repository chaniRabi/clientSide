



// src/features/search/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// דוגמא לפונקציה שמדמה קריאה ל-API לקבלת מוצרים
// const fetchProducts = async (searchTerm) => {
//   // נניח שיש לך API שמחזיר את המוצרים לפי מילות חיפוש
//   const response = await fetch(`/api/products?search=${searchTerm}`);
//   const data = await response.json();
//   return data;
// };

// פעולה אסינכרונית לחיפוש מוצרים
// export const searchProducts = createAsyncThunk(
//   'search/searchProducts',
//   async (searchTerm) => {
//     const products = await fetchProducts(searchTerm);
//     return products;
//   }
// );

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: ''
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
