import React from 'react';
import { act, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { authorize } from '@store/auth/auth.slice';
import { Header } from './header.component';
import { renderWithProviders } from '@/utils/render-with-providers.test-util';

describe('Header', () => {
  test('contains nav-links to all functional pages', () => {
    const navItemsNames = [
      'Home',
      'Catalog',
      'Product',
      'Cart',
      'Profile',
      'About',
      '404',
      'Error',
    ];

    renderWithProviders(<Header />);

    const navItems = screen.queryAllByRole('navigation');

    navItemsNames.forEach(name => {
      expect(navItems.find(item => within(item).queryByText(name))).toBeInTheDocument();
    });
  });

  test("render 'sing-in' / 'sign-up' options according to authorization status", () => {
    const { store } = renderWithProviders(<Header />);

    expect(screen.getByText('sign in')).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();

    act(() => store.dispatch(authorize({})));

    expect(screen.queryByText('sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('register')).not.toBeInTheDocument();
  });

  test('snapshot match', () => {
    const { asFragment } = renderWithProviders(<Header />);

    expect(asFragment()).toMatchSnapshot('header-snapshot');
  });
});
