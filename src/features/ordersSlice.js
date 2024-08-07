

import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    orders: [],
    status: []
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        updateOrderStatus: (state, action) => {
            const index = state.orders.findIndex(order => order.id === action.payload.id);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        },
        deleteOrder: (state, action) => {
            state.orders = state.orders.filter(order => order.id !== action.payload);
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setOrders, addOrder, updateOrderStatus, deleteOrder, setStatus } = ordersSlice.actions;

export default ordersSlice.reducer;