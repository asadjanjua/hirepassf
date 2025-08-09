import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    setStep1Data,
    setStep2Data,
    setTempUserId,
    setCurrentStep,
    clearSignup
} from '../slices/signupSlice';
import { setUser, setAuthenticated } from '../slices/authSlice';
import { setError, clearAllErrors } from '../slices/errorSlice';

// Step 1 Signup Thunk
export const signupStep1 = createAsyncThunk(
    'signup/signupStep1',
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            // Set loading state
            dispatch(setLoading({ field: 'step1', status: true }));
            
            // Clear previous errors
            dispatch(clearAllErrors());
          
            const response = await fetch('http://localhost:5000/api/signup/step1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Step 1 signup failed');
            }

            const data = await response.json();

            // Store step 1 data and temp user ID from backend
            dispatch(setStep1Data(formData));
            dispatch(setTempUserId(data.tempUserId));
            dispatch(setCurrentStep(2));

            return data;
        } catch (error) {
            // Set error in error slice
            dispatch(setError({ field: 'signup', message: error.message }));
            return rejectWithValue(error.message);
        } finally {
            // Clear loading state
            dispatch(setLoading({ field: 'step1', status: false }));
        }
    }
);


 // Step 2 Signup Thunk
 
export const signupStep2 = createAsyncThunk(
    'signup/signupStep2',
    async (formData, { dispatch, getState, rejectWithValue }) => {
        try {
            // Set loading state
            dispatch(setLoading({ field: 'step2', status: true }));
            
            // Clear previous errors
            dispatch(clearAllErrors());

            const { signup } = getState();
            const payload = {
                ...formData,
                tempUserId: signup.tempUserId, // attach from step 1
            };

            const response = await fetch('http://localhost:5000/api/signup/step2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Step 2 signup failed');
            }

            const data = await response.json();

            // Store step 2 data
            dispatch(setStep2Data(formData));

            // Log in user immediately after signup success
            dispatch(setUser(data.user));
            dispatch(setAuthenticated(true));

            // Clear signup temp state
            dispatch(clearSignup());

            return data;
        } catch (error) {
            // Set error in error slice
            dispatch(setError({ field: 'signup', message: error.message }));
            return rejectWithValue(error.message);
        } finally {
            // Clear loading state
            dispatch(setLoading({ field: 'step2', status: false }));
        }
    }
);
