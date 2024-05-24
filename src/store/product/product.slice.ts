import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { ISingleProduct } from '@/interfaces/interfaces';

interface IProductState {
  product: ISingleProduct;
}

const initialState: IProductState = {
  product: {
    id: '',
    title: '',
    description: '',
    imageSrc: '',
    imageAlt: '',
    currentPrice: 0,
    currency: '',
    discountPrice: 0,
    weight: '',
    ingredients: '',
    nutrition: '',
    further: '',
    maker: '',
    slug: '',
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    select(state, action: PayloadAction<ISingleProduct>) {
      state.product = action.payload;
    },
  },
});

export const { select } = productSlice.actions;
export const selectProduct = (state: RootState) => state.product.product;
export const productReducer = productSlice.reducer;
