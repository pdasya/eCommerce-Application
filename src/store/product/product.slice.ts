import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { ISingleProduct } from '@/interfaces/interfaces';

interface IProductState {
  selectedId: string;
  selectedProduct: ISingleProduct;
}

const initialState: IProductState = {
  selectedId: '',
  selectedProduct: {
    id: '',
    title: '',
    description: '',
    images: [],
    currentPrice: 0,
    currency: '',
    discountPrice: 0,
    attributes: [],
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectedId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
    select(state, action: PayloadAction<ISingleProduct>) {
      state.selectedProduct = action.payload;
    },
    clear(state) {
      state.selectedProduct = initialState.selectedProduct;
    },
  },
});

export const { selectedId, select, clear } = productSlice.actions;
export const selectProduct = (state: RootState) => state.product.selectedProduct;
export const selectId = (state: RootState) => state.product.selectedId;
export const productReducer = productSlice.reducer;
