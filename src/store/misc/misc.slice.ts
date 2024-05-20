import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface IMiscState {
  isLoading: boolean;
  isAuthPending: boolean;
}

const initialState: IMiscState = {
  isLoading: false,
  isAuthPending: true,
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
    authPending(state, action) {
      state.isAuthPending = true;
    },
    authEnd(state, action) {
      state.isAuthPending = false;
    },
  },
});

export const { loading, loadEnd, authPending, authEnd } = miscSlice.actions;
export const selectLoading = (state: RootState) => state.misc.isLoading;
export const selectAuthPending = (state: RootState) => state.misc.isAuthPending;
export const miscReducer = miscSlice.reducer;
