
import {
    Dialog,
    DialogTitle,
    Slide,
    Box,
    IconButton,
    DialogContent,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import { useCallback, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../styles/themeStyle";
import styled from "@emotion/styled";
import { ProductAddToCart, Product, ProductImage, ProductCountAction } from "../styles/product";
import { BannerShopButton } from "../styles/banner";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SingleProductDesktop from "./SingleProductDesktop";
import { RemoveProductFromCart, GetProductsInCartByUserId, AddProductToCart, UpdateProduct } from "../utils/productInCart";
import { ADD_ITEM } from "../features/productInCartSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductButtons from "./ProductButtons";


function SlideTransition(props) {
    return <Slide direction="down" {...props} />;
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    padding: theme.spacing(4),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    lineHeight: 1.5,
}));

export default function ProductDetail({ product }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.user.logedUser);//בשביל שימוש מהסלייס - לזהות את המשתמש ונלקח מסלייס
    const navigate = useNavigate()
   
    return (
        <ProductDetailWrapper display={"flex"} flexDirection={matches ? "column" : "row"}>
        <Product sx={{ mr: 4 }}>
            <ProductImage style={{ maxWidth: '600px' }} src={product.image} />
        </Product>

        <ProductDetailInfoWrapper>
            <Typography textTransform={"uppercase"} sx={{ lineHeight: 2 }} variant="h4">
                {product.name}
            </Typography>
            <Typography variant="body">
                {product.description}
            </Typography>
           
            <ProductButtons product={product}></ProductButtons>
            <Box
                display="flex"
                alignItems="center"
                sx={{ mt: 4, color: Colors.light }}
            >
                <FavoriteIcon sx={{ mr: 2 }} />
                הוסף לרשימת המשאלות
            </Box>
            {/* הסרת השורות של האייקונים של הרשתות החברתיות */}
        </ProductDetailInfoWrapper>
    </ProductDetailWrapper>
    );
}
