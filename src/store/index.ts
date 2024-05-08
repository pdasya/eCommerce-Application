import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../modules/auth/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
