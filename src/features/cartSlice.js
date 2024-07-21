import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     quantity: 0,
//   };

export const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        // items:[],
        items: 0,
    },
    reducer:{
        addToCart: (stat, action) =>{
            stat.items.push(action.payload);
        },
        remoneFromCart:(stat, action) =>{
            stat.items = stat.items.filter(item=>item.id !== action.payload.id);
        },
        incrementQuantity: (state, action) => {
            const product = state.products.find(product => product.id === action.payload.id);
            product.quantity++;
          },
          decrementQuantity: (state, action) => {
            const product = state.products.find(product => product.id === action.payload.id);
            if (product.quantity > 1) {
              product.quantity--;
            }
        // addItem: (state) => {
        //     state.items += 1;
        //   },
        //   removeItem: (state) => {
        //     state.items -= 1;
        },
    },
});

// export const { addItem, removeItem } = cartSlice.actions;
export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;