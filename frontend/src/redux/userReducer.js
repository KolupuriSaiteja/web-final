import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  session: null,
  cart: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    logout: (state) => {
      state.session = null;
      state.cart = [];
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeCartItem: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart?.filter((c) => c?.product?._id !== productId);
    },
    updateCartItem: (state, action) => {
      const productId = action.payload?.product?._id;
      const quantity = action.payload?.quantity;
      state.cart = state.cart?.map((c) =>
        c?.product?._id === productId ? { ...c, quantity: quantity } : c
      );
    },
  },
});

export const {
  setSession,
  addToCart,
  logout,
  clearCart,
  removeCartItem,
  updateCartItem,
} = userSlice.actions;

export default userSlice.reducer;
