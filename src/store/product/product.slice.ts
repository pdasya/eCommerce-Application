import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { ISingleProduct } from '@/interfaces/interfaces';

interface IProductState {
  selectedProduct: ISingleProduct;
}

const initialState: IProductState = {
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
    select(state, action: PayloadAction<ISingleProduct>) {
      state.selectedProduct = action.payload;
    },
    clear(state) {
      state.selectedProduct = initialState.selectedProduct;
    },
  },
});

export const { select, clear } = productSlice.actions;
export const selectProduct = (state: RootState) => state.product.selectedProduct;
export const productReducer = productSlice.reducer;
