import { createSlice } from "@reduxjs/toolkit";//מייבאים את הפונקציה createSlice
// מהספרייה "@reduxjs/toolkit" 
//שנדרשת ליצירת סלייס ב Redux


let initialState = {
    categries: [] , //מאתחלים את המצב ההתחלתי של הקטגוריות עם מערך ריק
    selectedCategoryId: -1
};

export const categriesSlice = createSlice({  //יצירת סלייס של הקטגוריות באמצעות הפונקציה createSlice
   //הסלייס כולל שם (name) שהוא 'categries',
   // מצב התחלתי שהוגדר למעלה (initialState))
   // ופונקצית רידוסר המגדירה איך ישתנה המצב בתגובה לפעולות שנשלחות 
   // ל-store 
   //ואז משתנה האפליקציה בהתאם
    name: 'categries',
    initialState,
    reducers: {
        //הפונקציה משנה את המצב של הקטגוריות
        setCategries: (state, action) => {
            state.categries = action.payload;//קבלת ערך חדש מהפעולה
        },
        setSelectedCategoryId: (state, action) => {
            state.selectedCategoryId = action.payload;//קבלת ערך חדש מהפעולה
        },
    },
});

export const {setCategries, setSelectedCategoryId} = categriesSlice.actions;

export default categriesSlice.reducer;