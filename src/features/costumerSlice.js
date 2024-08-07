

//סלייס לקוחות המטפל בניהול לקוחות
// features/customersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// סטייט ראשוני של הלקוחות
const initialState = {
    customers: [],
    status: 'idle', // אפשרויות: 'idle', 'loading', 'succeeded', 'failed'
    error: null
};

// פעולה אסינכרונית להבאת לקוחות
// export const fetchCustomers = createAsyncThunk(
//     'customers/fetchCustomers',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.get('/api/customers'); // כתובת ה-API שלך
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // פעולה אסינכרונית למחיקת לקוח
// export const deleteCustomer = createAsyncThunk(
//     'customers/deleteCustomer',
//     async (customerId, { rejectWithValue }) => {
//         try {
//             await axios.delete(`/api/customers/${customerId}`); // כתובת ה-API למחיקת לקוח
//             return customerId;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// יצירת ה-slice
const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        // פעולה לעדכון הלקוחות, אם נצטרך לשנות את הרשימה בצורה אחרת
        setCustomers: (state, action) => {
            state.customers = action.payload;
        },
    },
    addCustomers: (state, action) => {
        state.products.push(action.payload);
    },
    editCustomers: (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
            state.products[index] = action.payload;
        }
    },
    deleteCustomer: (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
    },
 
    
});

// ייצוא הפונקציות
export const { setCustomers, deleteCustomer,addCustomers,editCustomers} = customersSlice.actions;
export default customersSlice.reducer;

