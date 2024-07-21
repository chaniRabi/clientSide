

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  message: '',
  isSubmitted: false,  // מצב חדש לניהול האם הטופס נשלח

};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearForm: (state) => {
      state.name = '';
      state.email = '';
      state.message = '';
    },
    setIsSubmitted: (state, action) => {  // פעולה לניהול מצב השליחה
        state.isSubmitted = action.payload;
      },
  },
});

export const { setName, setEmail, setMessage, clearForm, setIsSubmitted } = contactSlice.actions;
export default contactSlice.reducer;
