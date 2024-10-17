import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const patientDetails = createAsyncThunk(
  "user/patient-details",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/patient-details",
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
        "http://localhost:4000/user/appiontment",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error properly
    }
  }
);
