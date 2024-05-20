import React from 'react';
import { act, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { authorize, unauthorize } from '@store/auth/auth.slice';
import { authEnd, authPending } from '@store/misc/misc.slice';
import { Header } from './header.component';
import { renderWithProviders } from '@/utils/render-with-providers.test-util';

describe('Header', () => {
  test('contains nav-links', () => {
    const navItemsNames = [
      'Home',
      'Catalog',
      'About',
    ];

    renderWithProviders(<Header />);

    const navItems = screen.queryAllByRole('navigation');

    navItemsNames.forEach(name => {
      expect(navItems.find(item => within(item).queryByText(name))).toBeInTheDocument();
    });
  });

  test("render 'sing-in' / 'sign-up' options according to authorization status", () => {
    const { store } = renderWithProviders(<Header />);

    act(() => store.dispatch(authPending({})));
    act(() => store.dispatch(unauthorize({})));

    expect(screen.queryByText('sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('register')).not.toBeInTheDocument();

    act(() => store.dispatch(authEnd({})));

    expect(screen.queryByText('sign in')).toBeInTheDocument();
    expect(screen.queryByText('register')).toBeInTheDocument();

    act(() => store.dispatch(authorize({})));

    expect(screen.queryByText('sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('register')).not.toBeInTheDocument();
  });

  test('snapshot match', () => {
    const { asFragment } = renderWithProviders(<Header />);

    expect(asFragment()).toMatchSnapshot('header-snapshot');
  });
});
