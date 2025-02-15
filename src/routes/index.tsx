import React from 'react';
import App from '@app/app.component';
import { AboutPage } from '@pages/about/about.page';
import { CartPage } from '@pages/cart/cart.page';
import { CatalogPage } from '@pages/catalog/catalog.page';
import { Http404Page } from '@pages/http-404/http-404.page';
import { MainPage } from '@pages/main/main.page';
import { ProductPage } from '@pages/product/product.page';
import { ProfilePage } from '@pages/profile/profile.page';
import { SignInPage } from '@pages/sign-in/sign-in.page';
import { SignUpPage } from '@pages/sign-up/sign-up.page';
import { createHashRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { ErrorPage } from '@pages/error/error.page';
import { catalogDefaultCategorySlug } from '@config/constants';
import { PrivateRoute } from '@/components/private-route/private-route.component';
import { ErrorBoundary } from '@/modules/error-boundary';

export enum RoutePath {
  about = '/about',
  cart = '/cart',
  catalogDefault = `/catalog/${catalogDefaultCategorySlug}`,
  catalogBlank = `/catalog`,
  catalog = '/catalog/:category',
  http404 = '/404',
  main = '/',
  product = `/product/:id`,
  profile = '/profile',
  signIn = '/sign-in',
  signUp = '/sign-up',
  error = '/error',
}

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path={RoutePath.main} element={<App />} errorElement={<ErrorBoundary />}>
      <Route path="*" element={<Http404Page />} />
      <Route index element={<MainPage />} />
      <Route path={RoutePath.about} element={<AboutPage />} />
      <Route path={RoutePath.cart} element={<CartPage />} />
      <Route path={RoutePath.catalog} element={<CatalogPage />} />
      <Route path={RoutePath.http404} element={<Http404Page />} />
      <Route path={RoutePath.product} element={<ProductPage />} />
      <Route path={RoutePath.error} element={<ErrorPage />} />
      <Route
        path={RoutePath.catalogBlank}
        element={
          <PrivateRoute redirectTo={RoutePath.catalogDefault} redirectIf="always">
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path={RoutePath.profile}
        element={
          <PrivateRoute redirectTo={RoutePath.signIn} redirectIf="unauthorized">
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path={RoutePath.signIn}
        element={
          <PrivateRoute redirectTo={RoutePath.main} redirectIf="authorized">
            <SignInPage />
          </PrivateRoute>
        }
      />
      <Route
        path={RoutePath.signUp}
        element={
          <PrivateRoute redirectTo={RoutePath.main} redirectIf="authorized">
            <SignUpPage />
          </PrivateRoute>
        }
      />
    </Route>,
  ),
);
