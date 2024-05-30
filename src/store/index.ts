import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@store/auth/auth.slice';
import { miscReducer } from './misc/misc.slice';
import { catalogReducer } from './catalog/catalog.slice';
import { productReducer } from './product/product.slice';
import { categoryReducer } from './category/category.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  misc: miscReducer,
  product: productReducer,
  catalog: catalogReducer,
  category: categoryReducer,
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
