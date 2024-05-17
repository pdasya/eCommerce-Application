import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@store/auth/auth.slice';
import { counterReducer } from '@/modules/dummy-module/components/dummy-counter/dummy-counter.slice';

const rootReducer = combineReducers({ auth: authReducer, counter: counterReducer });

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
