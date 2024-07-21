

import { useEffect, useState } from "react";
import {
  ExtraActionsWrapper,
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductFavButton,
  ProductImage,
  ProductMetaWrapper,
} from "../../styles/product";
import { Stack, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import useDialogModal from "../useDialogModal";
import ProductDetail from "../productdetail";
import ProductMeta from "../ProductMeta";
import { useUIContext } from "../../context/ui";
import useCart from "../useCart";

export default function SingleProduct({ product, matches }) {
  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ProductDetail);
  const { setCart } = useUIContext();
  // NEW: add to cart
  const { addToCart, addToCartText } = useCart(product);
  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage src={product.photo} />
        <ProductMeta product={product} matches={matches} />
        <ProductActionsWrapper>
          <Stack direction={matches ? "row" : "column"}>
            <ProductFavButton isfav={0}>
              <FavoriteIcon />
            </ProductFavButton>
            <ProductActionButton>
              {/* <Tooltip placement="left" title="share this product">
                <ShareIcon color="primary" />
              </Tooltip> */}
            </ProductActionButton>
            <ProductActionButton onClick={() => showProductDetailDialog()}>
              <Tooltip placement="left" title="Full view">
                <FitScreenIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductAddToCart onClick={addToCart} variant="contained">{addToCartText}</ProductAddToCart>
      <ProductDetailDialog product={product} />
    </>
  );
}




// import React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { Grid } from '@mui/material';
// // import { Product, ProductImage } from '../styles/product';


// const Product=({product, matches}) => {
//   return (
//     <>
//      <Grid item key={product.id} xs={4}>
//      <Card sx={{ maxWidth: 345 }}>
//       <CardMedia
//         component="img"
//         alt={product.name}
//         height="140"
//         image={product.image}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {product.name}
//         </Typography>
//         <Typography gutterBottom variant="h6" component="div">
//           {product.description}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {" " +product.price}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">+</Button>
//         <span>0</span>
//         <Button size="small">-</Button>
//       </CardActions>
//     </Card>
//     </Grid>
//     </>
//   );
// };

// export default Product;
