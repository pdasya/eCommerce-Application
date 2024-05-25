import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { IProduct } from '@/interfaces/interfaces';

interface ICatalogState {
  sort: string;
  products: IProduct[];
}

const initialState: ICatalogState = {
  sort: 'createdAt asc',
  products: [],
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    sort(state, action) {
      state.sort = action.payload;
    },
    update(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    clear(state) {
      state.products = [];
    },
  },
});

export const { sort, update, clear } = catalogSlice.actions;
export const selectProducts = (state: RootState) => state.catalog.products;
export const selectSort = (state: RootState) => state.catalog.sort;
export const catalogReducer = catalogSlice.reducer;
