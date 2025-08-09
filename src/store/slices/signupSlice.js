import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step1Data: null,
  step2Data: null,
  tempUserId: null,
  currentStep: 1,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setStep1Data: (state, action) => {
      state.step1Data = action.payload;
    },
    setStep2Data: (state, action) => {
      state.step2Data = action.payload;
    },
    setTempUserId: (state, action) => {
      state.tempUserId = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    clearSignup: () => initialState, // cleaner reset
  },
});

export const {
  setStep1Data,
  setStep2Data,
  setTempUserId,
  setCurrentStep,
  clearSignup,
} = signupSlice.actions;

export default signupSlice.reducer;