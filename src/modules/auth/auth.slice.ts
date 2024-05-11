import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface IAuthState {
  isAuthorized: boolean;
  id: number | null;
}

const initialState: IAuthState = {
  isAuthorized: false,
  id: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action) {
      console.log('logged in');
      state.isAuthorized = true;
      state.id = action.payload.id;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unauthorize(state, action) {
      console.log('logged out');
      state.isAuthorized = false;
      state.id = initialState.id;
    },
  },
});

export const { authorize, unauthorize } = authSlice.actions;
export const selectAuthorization = (state: RootState) => state.auth.isAuthorized;
export const authReducer = authSlice.reducer;
