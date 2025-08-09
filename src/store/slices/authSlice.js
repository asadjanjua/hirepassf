import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  forgotPasswordEmail: '', // store email for forgot password flow
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.forgotPasswordEmail = ''; // clear email when logging out
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setForgotPasswordEmail: (state, action) => {
      state.forgotPasswordEmail = action.payload;
    },
  },
});

export const {
  setUser,
  setAuthenticated,
  logout,
  updateUser,
  setForgotPasswordEmail,
} = authSlice.actions;

export default authSlice.reducer;
