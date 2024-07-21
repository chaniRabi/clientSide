import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//להגדיר לסלייסס את הסטייט ההתחלתי שלו
// יצירה של משתנה סטייט עבור החלק הזה של הרדיוסר
const initialValue = {
    logedUser: localStorage.getItem('loggedUser')
        ? JSON.parse(localStorage.getItem('loggedUser'))
        : null,
    // users: []
    isLoggedIn: localStorage.getItem('loggedUser') ? true : false,
    status: 'idle',
};

// פעולה לשליחת מייל לשחזור סיסמה
export const sendPasswordResetEmail = createAsyncThunk(
    'user/sendPasswordResetEmail',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/password-reset', { email });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//Redux המפשטת את תהליך יצירת פרוסת-חלק מ  @reduxjs/toolkit היא פונקציה מספריית createSlice 
//store פרוסה -חלק מרידקס מייצגת חלק ממצב היישום הכולל וכולל את  הרדיוסר והפעולות הנחוצות לעדכון החלק הזה של משתנה הסטייט של ה
const userSlice = createSlice({
    name: "user",//מגדיר את השם עבור החלק הזה של הרידקס
    // להגדיר לסלייסס את הסטייט ההתחלתי שלו
    initialState: initialValue,

    // הגדרה של הפעולות ברדיוסר - זה בעצם הפעולות עבור החלק הזה של המשתנה סטייט
    //בתוך האובייקט הזה נכתוב את הפונקציות שאחראיות על שינוי המשתנים שמוגדרים באובייקט סטייט
    reducers: {
        setLoggedUser: (state, action) => {
            state.logedUser = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('loggedUser', JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.logedUser = null;
            state.isLoggedIn = false;
            localStorage.removeItem('loggedUser');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendPasswordResetEmail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendPasswordResetEmail.fulfilled, (state) => {
                state.status = 'success';
            })
            .addCase(sendPasswordResetEmail.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

// ייצוא של הפונקציות - הפעולות שכתבנו שמשנים את המשתנים שבמשתנה סטייט
// וכך נוכל לייבא את זה בקומפוננטה ולהתשמש בפונקציה
export const { setLoggedUser, logoutUser } = userSlice.actions;
//שיצרנו store והגדרה שלו במשתנה  index.jsוייבוא שלו ב reducer ייצוא של ה
export default userSlice.reducer;

