import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@store/auth/auth.slice';
import { miscReducer } from './misc/misc.slice';
import { catalogReducer } from './catalog/catalog.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  misc: miscReducer,
  catalog: catalogReducer,
});

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
