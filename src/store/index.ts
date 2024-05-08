import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/modules/auth/auth.slice';
import { counterReducer } from '@/modules/dummy-module/components/dummy-counter/dummy-counter.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
