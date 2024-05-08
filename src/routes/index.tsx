import React from 'react';
import App from '@app/app.component';
import { AboutPage } from '@pages/about/about.page';
import { CartPage } from '@pages/cart/cart.page';
import { CatalogPage } from '@pages/catalog/catalog.page';
import { Http404Page } from '@pages/http-404/http-404.page';
import { Http500Page } from '@pages/http-500/http-500.page';
import { MainPage } from '@pages/main/main.page';
import { ProductPage } from '@pages/product/product.page';
import { ProfilePage } from '@pages/profile/profile.page';
import { SignInPage } from '@pages/sign-in/sign-in.page';
import { SignUpPage } from '@pages/sign-up/sign-up.page';
import { createBrowserRouter } from 'react-router-dom';
import { ReduxTestPage } from '@pages/redux-test/redux-test.page';

export enum Route {
  app = '/app',
  about = '/about',
  cart = '/cart',
  catalog = '/catalog',
  http404 = '/404',
  http500 = '/500',
  main = '/',
  product = '/product',
  profile = '/profile',
  signIn = '/sign-in',
  signUp = '/signUp',
  reduxTest = '/redux-test',
}

export const router = createBrowserRouter([
  {
    path: Route.main,
    Component: MainPage,
    errorElement: <Http404Page />,
  },
  {
    path: Route.app,
    Component: App,
  },
  {
    path: Route.about,
    Component: AboutPage,
  },
  {
    path: Route.cart,
    Component: CartPage,
  },
  {
    path: Route.catalog,
    Component: CatalogPage,
  },
  {
    path: Route.http404,
    Component: Http404Page,
  },
  {
    path: Route.http500,
    Component: Http500Page,
  },

  {
    path: Route.product,
    Component: ProductPage,
  },
  {
    path: Route.profile,
    Component: ProfilePage,
  },
  {
    path: Route.signIn,
    Component: SignInPage,
  },
  {
    path: Route.signUp,
    Component: SignUpPage,
  },
  {
    path: Route.reduxTest,
    Component: ReduxTestPage,
  },
]);
