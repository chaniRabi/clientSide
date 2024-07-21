

export const ADD_TO_CART = 'ADD_TO_CRT';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product
});

export const removFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId
});


