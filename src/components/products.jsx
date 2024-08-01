


import React, { useEffect, useState } from 'react';//שימוש בהוק אפקט יביא נתוני מוצר כאשר נטען הרכיב
import { GetProducts, GetProductsByCategoryId } from '../utils/product';//באמצעות הפונקציה יביא רשימה של מוצרים
import { setProducts, setProductsByCategory } from '../features/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
import Categories from './categories';
import { useParams } from 'react-router-dom';
// import { setProductsPage, setCurrentPage } from '../../actions/productsActions';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SingleProductDesktop from "./SingleProductDesktop";
import CircularProgress from '@mui/material/CircularProgress';
import ProductList from "./ProductList";
import Search from './Search';


export default function Products() {
    // שימוש בשתנה של מערך מוצרים ששמרנו בחלק של המוצרים בסלייס
    const products = useSelector(state => state.product.products);
    const logedUser = useSelector(state => state.user.logedUser);
    const selectedCategoryId = useSelector(state => state.categries.selectedCategoryId);
    const searchTerm = useSelector(state => state.search.searchTerm);

    console.log('searchTerm', searchTerm);

    // const productsByCategory = useSelector(state => state.product.GetProductsByCategoryId);
    //  const productsView = productsByCategory?.length > 0 ? productsByCategory: products;
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    //  const handleOrderClick = () => {
    //      navigate('/order');
    //  };


    //  //  השם חייב להיות תואם למה שהגדרנו בApp.js - products/:categoryId
    // const { categoryId } = useParams();

    //שליפת נתונים: בפונקציה GetProductsList, לאחר שליפת המוצרים מהשרת, אנו מוסיפים לכל מוצר את שדה outOfStock על בסיס הכמות.
    const GetProductsList = async () => {
        const data = await GetProducts();
         // Adding outOfStock property based on quantity
         const updatedData = data.map(product => ({
            ...product,
            outOfStock: product.quantity === 0
        }));
        dispatch(setProducts(data));
    }

    useEffect(() => {
        GetProductsList()        // קריאה ל־API לקבל את המוצרים  
    }, [dispatch, products.length]);



    //טיפול בתרחיש שבו המוצרים עדיין נשלפים מה-API
    //מאפשר להציג הודעת טעינה לפני שליפת המוצרים ועיבודם במסך
    if (products?.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ p: 4 }}>
                <CircularProgress size={30} sx={{ mr: 5 }} />
                <Typography variant="h4" sx={{ mr: 5 }}>טוען מוצרים</Typography>
            </Box>
        );
    }


    return (
        <>
        <Search/>
            <ProductList></ProductList>
            <Box display="flex" justifyContent="center" sx={{ p: 10 }}>
                <Typography variant="h4">כלל המוצרים שלנו:</Typography>
            </Box>
            {/* {logedUser?.tipeUser == "admin" && <Button>הוסף מוצר</Button>} */}
     

            {/* <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={index + 1 === currentPage}
                    >
                        {index + 1}
                    </Button>
                ))}
        </Box> */}

            <Container>
                <Grid
                    container
                    spacing={{ xs: 4, md: 3 }}
                    justifyContent="center"
                    sx={{ margin: `20px 4px 10px 4px` }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {
                    products
                        .filter(product =>
                            (selectedCategoryId == -1 || selectedCategoryId === product.categoryId)
                            &&
                            ((!searchTerm) || product.name?.includes(searchTerm) || product.description?.includes(searchTerm))
                        )
                        .map((product) => (
                            <Grid item key={product._id} xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
                                <SingleProductDesktop product={product} matches={matches} />
                            </Grid>
                        ))
                    }
                </Grid>
                {/* <AppPagination setProducts={(p) => setProducts(p)}/> */}
            </Container>
        </>
    );
};


