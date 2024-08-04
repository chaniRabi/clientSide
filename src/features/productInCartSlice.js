import { createSlice } from "@reduxjs/toolkit";
import { GetProduct } from '../utils/product.js';
import { setLogedProduct } from './productsSlice.js'
import { ClearCart, RemoveProductFromCart, GetProductsInCartByUserId } from '../utils/productInCart.js';

//להגדיר לסלייס את הסטייט ההתחלתי שלו
// יצירה של משתנה סטייט עבור החלק הזה של הרדיוסר
const initialValue = {
    items: [], // מערך ריק שמכיל את הפריטים בעגלה
}

//Redux המפשטת את תהליך יצירת פרוסת-חלק מ  @reduxjs/toolkit היא פונקציה מספריית createSlice 
//store פרוסה -חלק מרידקס מייצגת חלק ממצב היישום הכולל וכולל את  הרדיוסר והפעולות הנחוצות לעדכון החלק הזה של משתנה הסטייט של ה
const productInCartSlice = createSlice({
    name: "productInCart",//מגדיר את השם עבור החלק הזה של הרידקס
    initialState: initialValue,//הגדרת אובייקט סטייט התחלתי עבור החלק הזה
    // הגדרה של הפעולות ברדיוסר - זה בעצם הפעולות עבור החלק הזה של המשתנה סטייט
    //בתוך האובייקט הזה נכתוב את הפונקציות שאחראיות על שינוי המשתנים שמוגדרים באובייקט סטייט
    reducers: {
        // SET_LOGGED_PRODUCTINCART: (state, action) => {
        //     state.logedProductInCart = action.payload;
        //   },
        SET_LOGGED_PRODUCTINCART: (state, action) => {
            state.items = action.payload;
        },
        ADD_ITEM: (state, action) => {

            const productInCart = action.payload;

            const existingItem = state.items.find(i => i.productId === productInCart.productId);
            if (existingItem) {
                state.items = state.items.map(i => i.productId === productInCart.productId
                    ? productInCart// שלוש נק' זה לשפןך אובייקט קיים לאובייקט חדש ומעדכן את הכמות שלו
                    : i
                );
            } else {
                state.items.push(productInCart);
            }
        },
        REMOVE_ITEM: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.items.find(i => i.id === itemId);
            if (existingItem) {
                // if (existingItem.quantity === 1) {
                    state.items = state.items.filter(i => i.id !== itemId);
                // } else {
                //     existingItem.quantity -= 1;
                // }
            }
            
        },
        CLEAR_CART: (state, action) => {
            state.items = []
        }
    }
});

// export const clearCartAsync = (userId) => async (dispatch) => {
//     try {
//       await ClearCart(userId);
//       dispatch({ type: 'CLEAR_CART_SUCCESS' }); // ניתן להוסיף פעולה נוספת
//     } catch (error) {
//       dispatch({ type: 'CLEAR_CART_ERROR', payload: error.message });
//     }
//   };


// ייצוא של הפונקציות - הפעולות שכתבנו שמשנים את המשתנים שבמשתנה סטייט
// וכך נוכל לייבא את זה בקומפוננטה ולהתשמש בפונקציה
export const { SET_LOGGED_PRODUCTINCART, ADD_ITEM, REMOVE_ITEM, CLEAR_CART } = productInCartSlice.actions;

// export const { SET_LOGGED_PRODUCTINCART } = productInCartSlice.actions;
//שיצרנו store והגדרה שלו במשתנה  index.jsוייבוא שלו ב reducer ייצוא של ה
export default productInCartSlice.reducer;

