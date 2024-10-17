import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://doctor-appiontment-app-api.vercel.app"
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
      return rejectWithValue(error.response.data); // Handle error properly
    }
  }
);
export const appiontmentDetails = createAsyncThunk(
  "user/patient-details",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/user/appiontment`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error properly
    }
  }
);
