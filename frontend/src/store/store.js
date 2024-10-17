import { configureStore } from "@reduxjs/toolkit";
import authRouter from "./authSlice.js";
const store = configureStore({
  reducer: {
    auth: authRouter,
  },
});

export default store;
