import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
  isAuthorized: boolean;
  id: number;
}

const initialState: IAuthState = {
  isAuthorized: false,
  id: -1,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action) {
      state.isAuthorized = true;
      state.id = action.payload.id;
    },
    unauthorize(state) {
      state.isAuthorized = false;
      state.id = initialState.id;
    },
  },
});

export const { authorize, unauthorize } = authSlice.actions;
export const authReducer = authSlice.reducer;
