import React, { useEffect, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
//import Product from './products';
import Header from './header';
import Nav from './nav';
import Footer from './footer';
//import Navigation from './navigation';
//import { GetProduct } from '../utils/product.js';
//import { setProducts } from '../features/productsSlice.js'
// import { addToCart,removFromCart } from '../features/cartSlice.js';}
import { Button, TextField, Grid, Typography, Container } from '@mui/material';
import { GetProduct } from '../utils/product';
import { AppbarContainer, AppbarHeader } from '../styles/headerStyle';
import Banner from './Banner';
import Promotions from './Promotions';
import BannerShopButton from '../styles/banner';
import { SET_LOGGED_PRODUCTINCART } from '../features/productInCartSlice';
import { GetProductsInCartByUserId } from '../utils/productInCart';


function HomePage() {
    const dispatch = useDispatch();
    // שימוש במשתנה ששמרנו ברידקס - כשהיוזר מתחבר לאתר
    const logedUser = useSelector(state => state.user.logedUser);
    const location = useLocation();

    useEffect(() => {
        if (logedUser) {
            const fetchProducts = async () => {
                const data = await GetProductsInCartByUserId(logedUser.id);
                dispatch(SET_LOGGED_PRODUCTINCART(data));
            };
            fetchProducts();
        }

    }, [logedUser]);

    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ marginTop: '150px !important' }}>
                <AppbarContainer>
                    <AppbarHeader>Welcome to Shine's Stock</AppbarHeader>
                </AppbarContainer>

                {/* הצגה של השם שמחובר עכשיו לאתר - מהמשתנה שקיבלנו מהרידקס */}

                {/* {logedUser != null ? <h3> שלום {logedUser.name}, ברוך הבא לשיינ'ס סטוק!</h3> : null} */}

                {location.pathname === '/' && (
                    <>
                        {logedUser != null ? <h3> שלום {logedUser.name}, ברוך הבא לשיינ'ס סטוק!</h3> : null}
                        {/* <input type="text" placeholder='חיפוש מוצר' />
                        <MyApp /> */}
                        <br></br>
                        <Promotions />
                        <Banner />
                    </>
                )}

                {/* תגית ששמים אותה כשרוצים לעשות ניווט מקונן - */}
                <Outlet></Outlet>
            </Container>

            <Footer />
        </>
    );

};

export default HomePage;