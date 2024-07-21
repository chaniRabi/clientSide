

import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    products: []
    
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        editProduct: (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProductQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const product = state.products.find(product => product.id === productId);
            if (product) {
              product.quantity -= quantity;
            }
        }    
    },
});

export const { setProducts, addProduct, editProduct, deleteProduct, updateProductQuantity } = productsSlice.actions;

export default productsSlice.reducer;