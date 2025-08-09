import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, clearAllErrors } from '../slices/errorSlice';

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { dispatch, rejectWithValue }) => {
        try {
            // Set loading state
            dispatch(setLoading({ field: 'login', status: true }));
            
            // Clear previous errors
            dispatch(clearAllErrors());
            
            const response = await fetch("http://localhost:5173/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            // Set error in error slice
            dispatch(setError({ field: 'login', message: error.message }));
            return rejectWithValue(error.message);
        } finally {
            // Clear loading state
            dispatch(setLoading({ field: 'login', status: false }));
        }
    }
);
    

// src/store/thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setForgotPasswordEmail } from "../slices/authSlice"; 

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || "Failed to send reset email");
      }

      // Save email in Redux store for later steps
      dispatch(setForgotPasswordEmail(email));

      return await res.json(); // maybe { success: true, message: "OTP sent" }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || "Invalid OTP");
      }

      return await res.json(); // maybe { success: true }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || "Failed to reset password");
      }

      return await res.json(); // maybe { success: true }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
