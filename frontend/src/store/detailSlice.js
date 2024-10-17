import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://doctor-appiontment-app-api.vercel.app";

export const patientDetails = createAsyncThunk(
  "user/patient-details",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/user/patient-details`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const appiontmentDetails = createAsyncThunk(
  "user/appointment-details", // Change this to a unique identifier
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/user/appiontment`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const detailSlice = createSlice({
  name: "detail",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(patientDetails.fulfilled, (state, action) => {
        // handle success
      })
      .addCase(appiontmentDetails.fulfilled, (state, action) => {
        // handle success
      });
  },
});

export default detailSlice.reducer;
