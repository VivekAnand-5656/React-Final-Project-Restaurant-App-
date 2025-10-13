import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    order: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    orderConfirm: (state) => {
      if (state.items.length > 0) {
        // Push current cart items as a new order
        state.order.push(...state.items.map(item => ({ ...item })));
        // Clear cart after order placed
        state.items = [];
      }
    }
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, orderConfirm } = cartSlice.actions;
export default cartSlice.reducer;
