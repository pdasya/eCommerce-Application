import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './header.component';
import { authorize } from '@/modules/auth/auth.slice';
import { renderWithProviders } from '@/utils/render-with-providers.test-util';

describe('Header', () => {
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
