
import React, { useEffect } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, ThemeProvider } from '@mui/system';

import userSlice from './features/userSlice';
import productsSlice from './features/productsSlice';
import prductInCartSlice from './features/productInCartSlice';
import categoriesSlice from './features/categoriesSlice';
import ordersSlice from './features/ordersSlice';
import contactSlice from './features/contactSlice';
import searchSlice from './features/searchSlice';
import customersReducer from './features/costumerSlice';

import ForgotPassword from './components/ForgotPassword';
import HomePage from './components/homePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Cart from './components/cart';
import Products from './components/products';
import Categories from './components/categories';
import Order from './components/order';
import ContactForm from './components/contactForm';
import AboutUs from './components/AboutUs';
import Payment from './components/Payment';
import Checkout from './components/checkoutPage';


import theme from "./styles/themeStyle";
import themeAdmin from "./styles/adminTheme";
import AdminApp from './components/adminComponents/AdminApp';
import Dashboard from './components/adminComponents/Dashboard';
import AdminProducts from './components/adminComponents/AdminProducts';
import Settings from './components/adminComponents/Settings';
import ProductManagement from './components/ProductManagement';
import OrderManagement from './components/OrderManagement';
import Conditions from './components/Conditions';
import MessagesList from './components/adminComponents/MessagesList';

const myStore = configureStore({
  reducer: {
    user: userSlice,
    product: productsSlice,
    cart: prductInCartSlice,
    categries: categoriesSlice,
    orders: ordersSlice,
    contact: contactSlice,
    search: searchSlice,
    customers: customersReducer,

  }
})

function App() {
  useEffect(() => {
    document.title = "שיינ'ס סטוק";
  }, []);

  return (
    <Provider store={myStore}>
      <ThemeProvider theme={theme} themeAdmin={themeAdmin}>
        <Container maxWidth="xl" sx={{ background: '#fff' }}>
          <Router>
            <Routes>
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/" element={<HomePage />}>
                <Route path="/about" element={<AboutUs />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/checkout" element={<Checkout />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/order" element={<Order />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/conditions" element={<Conditions />} />

              </Route>
              
              <Route path="/admin" element={<AdminApp />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path='message' element={<MessagesList/>}/>
                <Route path="settings" element={<Settings />} />
                <Route path="manage-products" element={<ProductManagement />} />
                <Route path="manage-orders" element={<OrderManagement />} />
              </Route>
            </Routes>
          </Router>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;




// import React from 'react';
// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import userSlice from './features/userSlice';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './components/homePage';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import Cart from './components/cart'
// import Header from './components/header';
// import Products from './components/products';
// import productsSlice from './features/productsSlice';
// import prductInCartSlice from './features/productInCartSlice';
// import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
// import { ThemeProvider } from '@mui/material/styles';
// import theme from "./styles/themeStyle";
// import { useEffect } from "react";
// import Categories from './components/categories';
// import categoriesSlice from './features/categoriesSlice';
// import Order from './components/order';
// import ordersSlice from './features/ordersSlice';
// import contactSlice from './features/contactSlice';
// import ContactForm from './components/contactForm';
// // import Search from './components/Search';
// import searchSlice from './features/searchSlice';
// import AboutUs from './components/AboutUs';
// import Payment from './components/Payment';
// import themeAdmin from './styles/adminTheme';
// import AdminApp from './components/adminComponents/AdminApp';
// import Dashboard from './components/adminComponents/Dashboard';
// import AdminProducts from './components/adminComponents/AdminProducts';
// import Settings from './components/adminComponents/Settings';



// const myStore = configureStore({
//   reducer: {
//     user: userSlice,
//     product: productsSlice,
//     cart: prductInCartSlice,
//     categries: categoriesSlice,
//     orders: ordersSlice,
//     contact: contactSlice,
//     search: searchSlice,
//     // cart2: cartSlice,
//   }
// })

// function App() {
//   useEffect(() => {
//     document.title = "שיינ'ס סטוק";
//   }, []);
//   //12

//   // const isAdmin = true; // זה צריך להיות מבוסס על לוגיקה בפועל, למשל אימות המשתמש


//   return (
//     <Provider store={myStore}>
//       {/* <ThemeProvider theme={isAdmin ? themeAdmin :theme}> */}
//       <ThemeProvider theme={theme}>
//         <Container maxWidth="xl" sx={{ background: '#fff' }}>
//            <Router>
//           {/* <Routes >
//           <Route  path='/admin' element={<AdminApp/>}/>
//           <Route  path='/dashboard' element={<Dashboard/>}/>
//           <Route  path='/adminProducts' element={<AdminProducts/>}/>
//           <Route  path='/setting' element={<Settings/>}/>
//           </Routes> */} 

//           <Routes>          
//               <Route path="/signIn" element={<SignIn />} />
//               <Route path="/signUp" element={<SignUp />} />
//               <Route path="/" element={<HomePage />}>
//                 <Route path="/about" element={<AboutUs />} />
//                 <Route path="/payment" element={<Payment />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/" element={<Categories />} />
//                 <Route path="/products" element={<Products />} />
//                 <Route path="/order" element={<Order />} />
//                 <Route path="/contact" element={<ContactForm />} />
//                 {/* <Route path="/search" component={<Search/>} /> */}
//                 {/* <Route path='/categories' element={<Categories/>}/> */}
//                 {/* <Route path="/Registration" element={<RegistrationForm/>} /> */}
//                 <Route />
//               </Route>
//             </Routes>
//           </Router>
//         </Container>
//       </ThemeProvider>
//     </Provider>
//   );
// }

// export default App;
