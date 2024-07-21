
import { useCallback, useEffect, useState } from "react";
import {
    ProductAddToCart,
    ProductCountAction,
} from "../styles/product";
import { RemoveProductFromCart, GetProductsInCartByUserId, AddProductToCart, UpdateProduct } from "../utils/productInCart";
import Swal from 'sweetalert2';
import { ADD_ITEM } from "../features/productInCartSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

const ProductButtons = ({ product }) => {

    const dispatch = useDispatch();

    const [count, setCount] = useState(1);
    const loggedUser = useSelector(state => state.user.logedUser);//בשביל שימוש מהסלייס - לזהות את המשתמש ונלקח מסלייס
    const navigate = useNavigate()
    const productsInCart = useSelector(state => state.cart.items)    //בשביל לזהות אם המוצר קיים כבר בעגלה
    const addToCartText = productsInCart?.find((item) => item.id === product?.id) ? "עדכן את העגלה" : "הוסף לעגלה ";

    const addToCart = async () => {



        // RemoveProductFromCart(productInCart).then(() => {
        //   dispatch((prevCart) => {
        //     return prevCart.filter((item) => item.id !== product.id);
        //   });
        // })

    };



    const checkLoginUser = () => {
        if (!loggedUser) {
            Swal.fire({
                title: "",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: "התחבר עכשיו",
                cancelButtonText: 'המשך לא מחובר'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signIn')
                }
            });
            return false
        }
        return true
    }

    const handleIncrease = () => {
        setCount(count + 1);
    };

    const handleDecrease = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    //פונקציה להודעה: הוסף מוצר בהצלחה
    const addToCartWithNotification = () => {

        if (!checkLoginUser())
            return

        const isProductInCart = productsInCart.find((item) => item.id === product.id);

        //יצירת אוביקט בשביל לשלוח לדטה בייס
        const productInCart = {
            amount: count,
            customerId: loggedUser ? loggedUser.id : null,// בדיקת תנאי לפני הגישה למשתנה
            productId: product ? product.id : null,

        }

        // const updatedProduct = {...product, amount: count}
        const newProduct = { ...product, productInCarts: [productInCart] }

        if (!isProductInCart) {
            AddProductToCart(productInCart).then((res) => {
                if (res.status === 200)
                dispatch(ADD_ITEM(newProduct));
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "המוצר נוסף בהצלחה לסל",
                    showConfirmButton: false,
                    customClass: {
                        popup: 'custom-swal'
                    }
                });
            })
        }
        else {
            UpdateProduct(productInCart.productId, productInCart).then((res) => {
                if (res.status === 200) {
                    dispatch(ADD_ITEM(newProduct));
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "המוצר נוסף בהצלחה לסל",
                        showConfirmButton: false,
                        customClass: {
                            popup: 'custom-swal'
                        }
                    });
                }
            })
        };

    };


    return <div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '200px', justifyContent: 'space-between', marginTop: '10px' }}>
            <ProductCountAction onClick={handleIncrease}>
                +
            </ProductCountAction>
            <span className="counter" >{count}</span>

            <ProductCountAction onClick={handleDecrease}>
                -
            </ProductCountAction>
        </div>

        <ProductAddToCart onClick={addToCartWithNotification} variant="contained">
            {/* // show={showOptions}  */}
            {addToCartText}
        </ProductAddToCart>
    </div>
}
export default ProductButtons