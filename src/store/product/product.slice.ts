import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boolean } from 'yup';
import { RootState } from '@/store';
import { ISingleProduct } from '@/interfaces/interfaces';

interface IProductState {
  isSelected: boolean;
  selectedProduct: ISingleProduct;
}

const initialState: IProductState = {
  isSelected: false,
  selectedProduct: {
    id: '',
    title: '',
    description: '',
    images: [],
    currentPrice: '0',
    currency: '',
    discountPrice: '0',
    attributes: [],
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    select(state, action: PayloadAction<ISingleProduct>) {
      state.selectedProduct = action.payload;
      state.isSelected = true;
    },
    clear(state) {
      state.selectedProduct = initialState.selectedProduct;
      state.isSelected = false;
    },
  },
});

export const { select, clear } = productSlice.actions;
export const selectProduct = (state: RootState) => state.product.selectedProduct;
export const selectIsProductSelected = (state: RootState) => state.product.isSelected;
export const productReducer = productSlice.reducer;
