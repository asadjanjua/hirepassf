import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step1Data: null,      // Info from first step
  step2Data: null,      // Info from second step before final submit
  tempUserId: null,     // ID returned from API after step 1
  currentStep: 1,       // Track which step the user is on
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
    clearSignup: (state) => {
      state.step1Data = null;
      state.step2Data = null;
      state.tempUserId = null;
      state.currentStep = 1;
      state.loading = false;
      state.error = null;
    },
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
