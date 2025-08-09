import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import signupReducer from './slices/signupSlice';
import errorReducer from './slices/errorSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    error: errorReducer,
  },
});