import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { ICategory } from '@/interfaces/category.interface';

interface ICategoryState {
  activeCategory: ICategory | null;
  activeSubCategories: ICategory[];
  activeCategoryAncestors: ICategory[];
  isActiveCategoryInitialized: boolean;
}

const initialState: ICategoryState = {
  activeCategory: null,
  activeSubCategories: [],
  activeCategoryAncestors: [],
  isActiveCategoryInitialized: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetActiveCategory(state, action: PayloadAction<void>) {
      state.activeCategory = null;
      state.activeCategoryAncestors = [];
      state.isActiveCategoryInitialized = true;
    },
    setActiveCategory(state, { payload }: PayloadAction<ICategoryState['activeCategory']>) {
      state.activeCategory = payload;
      state.isActiveCategoryInitialized = true;
    },
    setActiveSubCategories(
      state,
      { payload }: PayloadAction<ICategoryState['activeSubCategories']>,
    ) {
      state.activeSubCategories = payload;
    },
    setActiveCategoryAncestors(state, { payload }: PayloadAction<ICategory[]>) {
      state.activeCategoryAncestors = payload;
    },
  },
});

export const {
  setActiveCategory,
  resetActiveCategory,
  setActiveSubCategories,
  setActiveCategoryAncestors,
} = categorySlice.actions;
export const selectActiveCategory = (state: RootState) => state.category.activeCategory;
export const selectActiveSubCategories = (state: RootState) => state.category.activeSubCategories;
export const selectIsActiveCategoryInitialized = (state: RootState) =>
  state.category.isActiveCategoryInitialized;
export const selectActiveCategoryAncestors = (state: RootState) =>
  state.category.activeCategoryAncestors;
export const categoryReducer = categorySlice.reducer;
