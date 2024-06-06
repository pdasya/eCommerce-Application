import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { IProduct } from '@/interfaces/interfaces';

interface ISaleState {
  products: IProduct[];
  isProductsSaleUpdating: boolean;
}

const initialState: ISaleState = {
  products: [],
  isProductsSaleUpdating: true,
};

const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    update(state, action: PayloadAction<IProduct[]>) {
      state.products = [...action.payload];
    },
    productsSaleUpdating(state, action: PayloadAction<void>) {
      state.isProductsSaleUpdating = true;
    },
    productsSaleUpdatingEnd(state, action: PayloadAction<void>) {
      state.isProductsSaleUpdating = false;
    },
  },
});

export const { update, productsSaleUpdating, productsSaleUpdatingEnd } = saleSlice.actions;
export const productsSale = (state: RootState) => state.sale.products;
export const isProductsSaleUpdating = (state: RootState) => state.sale.isProductsSaleUpdating;

export const saleReducer = saleSlice.reducer;
