import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface IAuthState {
  isAuthorized: boolean;
  id: string | null;
  email: string | null;
}

const initialState: IAuthState = {
  isAuthorized: false,
  id: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action) {
      console.log('logged in');
      state.isAuthorized = true;
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
    unauthorize(state, action) {
      console.log('logged out');
      state.isAuthorized = false;
      state.id = initialState.id;
      state.email = initialState.email;
    },
  },
});

export const { authorize, unauthorize } = authSlice.actions;
export const selectAuthorization = (state: RootState) => state.auth.isAuthorized;
export const authReducer = authSlice.reducer;
