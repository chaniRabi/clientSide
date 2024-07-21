

import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    orders: []
    
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
        }
    },
});

export const { setOrders, addOrder, updateOrderStatus } = ordersSlice.actions;

export default ordersSlice.reducer;