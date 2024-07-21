// import { useEffect, useState } from "react";
// import { AddProductToCart, RemoveProductFromCart, UpdateCart } from '../utils/cart'
// import { useSelector, useDispatch } from "react-redux";
// import { GetProductsInCartByUserId } from "../utils/productInCart";
// import {ADD_ITEM, SET_LOGGED_PRODUCTINCART} from "../features/productInCartSlice"

// const useCart = (product, count) => {
//   // const [cart, setCart] = useState([]);
//   const dispatch = useDispatch();
//   const loggedUser = useSelector(state => state.user.logedUser);
//   // const cartItems = useSelector(state => state.productInCart)
//   const cart = useSelector(state => state.cart);


//   const addToCart = () => {   

//     const isProductInCart = cart.items.find((item) => item.id === product.id);

//     const productInCart = {
//       amount: count,
//       customerId: loggedUser.id,
//       productId: product.id,
//     }
//     const updatedProduct = {...product, amount: count}
//     console.log("updatedProduct", updatedProduct)

//     if (!isProductInCart) {
//       AddProductToCart(productInCart).then(() => {
//         console.log('!', [...cart, updatedProduct]);
//         dispatch((prevCart) => {
//             return [...prevCart, updatedProduct];
//           });
//       })
//     }
//     else {
//       UpdateCart(productInCart.productId, productInCart).then(()=> {
//         const updatedCart = cart.map(item => item.productId === updatedProduct.productId ?  updatedProduct : item );
//         console.log("updatedCart", updatedCart)
//         dispatch(updatedCart);
//       })
//     } ;
    
//     // const removeFromCart = (productId) => {
//     //   RemoveProductFromCart(productId);
//     //   const existingProduct = cart.find(item => item.id === productId);
//     //   if (existingProduct.quantity === 1) {
//     //     setCart(cart.filter(item => item.id !== productId));
//     //   } else {
//     //     setCart(cart.map(item => 
//     //       item.id === productId 
//     //         ? { ...item, quantity: item.quantity - 1 } 
//     //         : item
//     //     ));
//     //   }
//     // };

//     RemoveProductFromCart(productInCart).then(() => {
//       dispatch((prevCart) => {
//             return prevCart.filter((item) => item.id !== product.id);
//           });
//       })

//   };

//   console.log("cart", cart)
//   const addToCartText = cart.items.find((item) => item.id === product?.id) ? "עדכן את הסל" : "הוסף לסל ";

//   return { cart, addToCart, addToCartText };
// };



// export default useCart;