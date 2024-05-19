import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface IMiscState {
  isLoading: boolean;
}

const initialState: IMiscState = {
  isLoading: false,
};

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    loading(state, action) {
      state.isLoading = true;
    },
    loadEnd(state, action) {
      state.isLoading = false;
    },
  },
});

export const { loading, loadEnd } = miscSlice.actions;
export const selectLoading = (state: RootState) => state.misc.isLoading;
export const miscReducer = miscSlice.reducer;
