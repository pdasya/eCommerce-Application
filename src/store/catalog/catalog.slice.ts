import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { IProduct } from '@/interfaces/interfaces';

interface ICatalogState {
  products: IProduct[];
}

const initialState: ICatalogState = {
  products: [],
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    update(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    clear(state) {
      state.products = [];
    },
  },
});

export const { update, clear } = catalogSlice.actions;
export const selectProducts = (state: RootState) => state.catalog.products;
export const catalogReducer = catalogSlice.reducer;
