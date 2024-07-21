

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import ShoppingCartIcon from '@material-ui/icons'; 
// import { GetProductsInCartByUserId } from '../utils/cart'; 

// const CartIcon = ({ userId }) => {
//   const [cartItemCount, setCartItemCount] = useState(0);

//   useEffect(() => {
//     const fetchCartItemCount = async () => {
//       try {
//         const cartItems = await GetProductsInCartByUserId(userId);
//         setCartItemCount(cartItems.length);
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//       }
//     };

//     fetchCartItemCount();
//   }, [userId]);

//   return (
//     <Link to="/cart" style={{ color: 'white', position: 'relative', display: 'inline-block' }}>
//       <ShoppingCartIcon size={50} style={{ color: 'white' }} />
//       {cartItemCount > 0 && (
//         <span
//           style={{
//             position: 'absolute',
//             top: '-10px',
//             right: '-10px',
//             backgroundColor: 'red',
//             color: 'white',
//             borderRadius: '50%',
//             padding: '5px 10px',
//             fontSize: '12px',
//           }}
//         >
//           {cartItemCount}
//         </span>
//       )}
//     </Link>
//   );
// };

// export default CartIcon;
