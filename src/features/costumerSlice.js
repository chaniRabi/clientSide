

//סלייס לקוחות המטפל בניהול לקוחות
// features/customersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// סטייט ראשוני של הלקוחות
const initialState = {
    customers: [],
    status: 'idle', // אפשרויות: 'idle', 'loading', 'succeeded', 'failed'
    error: null
};

// פעולה אסינכרונית להבאת לקוחות
export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/customers'); // כתובת ה-API שלך
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// פעולה אסינכרונית למחיקת לקוח
export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async (customerId, { rejectWithValue }) => {
        try {
            await axios.delete(`/api/customers/${customerId}`); // כתובת ה-API למחיקת לקוח
            return customerId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter(customer => customer.id !== action.payload);
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

// ייצוא הפונקציות
export const { setCustomers } = customersSlice.actions;
export default customersSlice.reducer;

