import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from './product.interface';

type CartItem = {
  amount: number;
  product: IProduct;
};

interface ICartState {
  cart: CartItem[];
}

const initialState: ICartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToCart(state, action) {
      const added: CartItem = action.payload;
      const existing = state.cart.find(item => item.product.id === added.product.id);

      if (existing) {
        existing.amount += added.amount;
      } else {
        state.cart.push({ ...added });
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(item => item.product.id !== action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
