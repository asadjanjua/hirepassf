import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: {},
  loading: {},
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      const { field, message } = action.payload;
      state.errors[field] = message;
    },
    clearError: (state, action) => {
      const field = action.payload;
      delete state.errors[field];
    },
    clearAllErrors: (state) => {
      state.errors = {};
    },
    setLoading: (state, action) => {
      const { field, status } = action.payload;
      state.loading[field] = status;
    },
    clearLoading: (state, action) => {
      const field = action.payload;
      delete state.loading[field];
    },
  },
});

export const { setError, clearError, clearAllErrors, setLoading, clearLoading } = errorSlice.actions;

export default errorSlice.reducer;