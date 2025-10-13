import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import showLoginReducer from './features/show'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    showLogin : showLoginReducer, // 👈 add all slices here
  },
});
