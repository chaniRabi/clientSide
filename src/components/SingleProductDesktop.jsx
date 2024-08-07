import { useCallback, useEffect, useState } from "react";
import {
  ExtraActionsWrapper,
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductCountAction,
  ProductFavButton,
  ProductImage,
  ProductMetaWrapper,
} from "../styles/product";
import { Stack, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import ProductMeta from "./ProductMeta";
import ProductDetail from "./productdetail";
import useDialogModal from "./useDialogModal";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../App.css'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { RemoveProductFromCart, GetProductsInCartByUserId, AddProductToCart, UpdateProduct } from "../utils/productInCart";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { ADD_ITEM } from "../features/productInCartSlice";
import { GetProductsByCategoryId } from "../utils/product"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ProductButtons from "./ProductButtons";
import ProductDetailsDialog from "./ProductDetailsDialog";
import FavoritesList from "./Favorites";
import { addFavorite, removeFavorite } from "../features/favoritesSlice";

export default function SingleProductDesktop({ width, product, matches }) {

  // const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] = useDialogModal(ProductDetail);

  const [showOptions, setShowOptions] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.some(fav => fav.id === product.id);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const handleAddToFavorites = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const isOutOfStock = product.quantity === 0;


  return (
    <>
      <Product
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      >
        <ProductImage width={'350px'} src={product.image} />

        <ProductFavButton isfav={isFavorite ? 1 : 0} onClick={handleAddToFavorites}>
          <FavoriteIcon color={isFavorite ? "secondary" : "action"} />
        </ProductFavButton>

        {/* <ProductFavButton isfav={0}>
          <FavoriteIcon />
        </ProductFavButton> */}
        {/* <IconButton aria-label="delete" onClick={() => RemoveProductFromCart(item.id)}>
          <DeleteIcon />
        </IconButton> */}
        <ProductActionsWrapper show={showOptions || matches}>
          <Stack direction={matches ? 'row' : 'column'}>

            <ProductActionButton onClick={() => setOpen(true)}>
              <Tooltip title="מסך מלא">
                <FitScreenIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
            <ProductDetailsDialog
              product={product}
              open={open}
              setOpen={setOpen}
              fullScreen
              sx={{ '& .MuiDialog-paper': { maxWidth: '100%', maxHeight: '100%' } }}
            ></ProductDetailsDialog>
          </Stack>
        </ProductActionsWrapper>

        <ProductButtons product={product}></ProductButtons>

        {isOutOfStock && (
          <Typography variant="h6" color="error">
            אזל מהמלאי
          </Typography>
        )}

      </Product>

      <ProductMeta product={product} />

      {/* <FavoritesList /> */}

    </>
  );
}