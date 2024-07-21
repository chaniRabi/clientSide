import React from 'react';
import {GetCartById , GetAllProductInCart }  from "../utils/productInCart";
import {GetProduct} from '../utils/product';
import {Card, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {} from '../features/productInCartSlice'

const ProductInCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <div>
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      <button onClick={handleAddToCart}>הוסף לסל </button>
    </div>
  );
};

export default ProductInCart;
