import { configureStore } from "@reduxjs/toolkit";
import authRouter from "./authSlice.js";
import detailReducer from "./detailSlice.js";
const store = configureStore({
  reducer: {
    auth: authRouter,
    detail: detailReducer,
  },
});

export default store;
