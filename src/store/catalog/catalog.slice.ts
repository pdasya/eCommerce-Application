import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortBy } from '@config/sorting-options';
import { RootState } from '@/store';
import { IProduct } from '@/interfaces/interfaces';

interface ICatalogState {
  sort: SortBy;
  search: string;
  tempSearchValue: string;
  products: IProduct[];
  category: string | null;
  priceLimits: { min: number; max: number };
  priceFilter: { min: number; max: number };
  customFilterOptions: Record<string, string[]>;
  customFilters: Record<string, Record<string, boolean>>;
}

const initialState: ICatalogState = {
  sort: SortBy.default,
  search: '',
  tempSearchValue: '',
  products: [],
  category: null,
  priceLimits: { min: 0, max: 0 },
  priceFilter: { min: 0, max: 0 },
  customFilterOptions: {},
  customFilters: {},
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<ICatalogState['category']>) {
      state.category = action.payload;
    },
    setPriceLimits(state, action: PayloadAction<ICatalogState['priceLimits']>) {
      state.priceLimits = action.payload;
    },
    setPriceFilter(state, action: PayloadAction<ICatalogState['priceFilter']>) {
      state.priceFilter = action.payload;
    },
    setCustomFilterOptions(state, action: PayloadAction<ICatalogState['customFilterOptions']>) {
      const initialEntries = Object.entries(action.payload).map(([attribute, values]) => [
        attribute,
        values.reduce((acc, option) => ({ ...acc, [option]: false }), {}),
      ]);

      state.customFilters = Object.fromEntries(initialEntries);
      state.customFilterOptions = { ...action.payload };
    },
    setCustomFilters(state, action: PayloadAction<ICatalogState['customFilters']>) {
      state.customFilters = { ...action.payload };
    },
    resetAllFilters(state, action: PayloadAction<void>) {
      const initialEntries = Object.entries(state.customFilterOptions).map(
        ([attribute, values]) => [
          attribute,
          values.reduce((acc, option) => ({ ...acc, [option]: false }), {}),
        ],
      );

      state.customFilters = Object.fromEntries(initialEntries);
      const { min, max } = state.priceLimits;
      state.priceFilter = { min, max };
    },
    sort(state, action: PayloadAction<ICatalogState['sort']>) {
      state.sort = action.payload;
    },
    search(state, action: PayloadAction<ICatalogState['search']>) {
      state.search = action.payload;
    },
    tempSearch(state, action: PayloadAction<ICatalogState['tempSearchValue']>) {
      state.tempSearchValue = action.payload;
    },
    update(state, action: PayloadAction<IProduct[]>) {
      state.products = [...action.payload];
    },
    clear(state) {
      state.products = [];
    },
  },
});

export const {
  sort,
  search,
  tempSearch,
  update,
  clear,
  setPriceFilter,
  setPriceLimits,
  setCustomFilterOptions,
  setCustomFilters,
  resetAllFilters,
} = catalogSlice.actions;
export const selectProducts = (state: RootState) => state.catalog.products;
export const selectSort = (state: RootState) => state.catalog.sort;
export const searchValue = (state: RootState) => state.catalog.search;
export const tempSearchValue = (state: RootState) => state.catalog.tempSearchValue;
export const selectCategory = (state: RootState) => state.catalog.category;
export const selectPriceLimits = (state: RootState) => state.catalog.priceLimits;
export const selectPriceFilter = (state: RootState) => state.catalog.priceFilter;
export const selectCustomFilterOptions = (state: RootState) => state.catalog.customFilterOptions;
export const selectCustomFilters = (state: RootState) => state.catalog.customFilters;
export const catalogReducer = catalogSlice.reducer;
