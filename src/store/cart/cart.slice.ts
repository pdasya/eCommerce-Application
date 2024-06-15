import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart } from '@modules/cart/interfaces/cart.interface';
import { RootState } from '@/store';

interface ICartState {
  cart: ICart;
}

const initialState: ICartState = {
  cart: {
    id: '',
    version: 0,
    currency: '',
    items: [],
    initialPrice: 0,
    discount: 0,
    finalPrice: 0,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart(state, action: PayloadAction<ICart>) {
      state.cart = action.payload;
    },
    resetCart(state, action: PayloadAction<void>) {
      state.cart = initialState.cart;
    },
  },
});

export const { updateCart, resetCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartItemsQuantity = (state: RootState) => state.cart.cart.items.length;
export const cartReducer = cartSlice.reducer;
