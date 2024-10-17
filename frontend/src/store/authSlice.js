import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isVerified: false,
  isLoading: false,
  error: null,
  user: null,
};

// Thunk to send OTP
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/send-otp",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error properly
    }
  }
);

// Thunk to verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ otpString, phoneNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/verify-otp",
        {
          otp: otpString,
          phoneNumber,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error properly
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      // Send OTP cases
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.message
          : "Failed to send OTP";
      })

      // Verify OTP cases
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.isVerified = null; // Reset verification status
        state.error = null; // Clear previous errors
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.isVerified = true; // OTP verified successfully
        } else {
          state.isVerified = false; // OTP verification failed
        }
        state.error = null; // Clear previous error
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isVerified = false; // Set false if OTP verification failed
        state.error = action.payload
          ? action.payload.message
          : "OTP verification failed"; // Set error message
      });
  },
});

export default authSlice.reducer;
