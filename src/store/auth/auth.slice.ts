import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface IAuthState {
  isAuthorized: boolean;
  id: string;
  email: string;
}

const initialState: IAuthState = {
  isAuthorized: false,
  id: '',
  email: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action) {
      state.isAuthorized = true;
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
    unauthorize(state, action) {
      state.isAuthorized = false;
      state.id = initialState.id;
      state.email = initialState.email;
    },
  },
});

export const { authorize, unauthorize } = authSlice.actions;
export const selectAuthorization = (state: RootState) => state.auth.isAuthorized;
export const authReducer = authSlice.reducer;
