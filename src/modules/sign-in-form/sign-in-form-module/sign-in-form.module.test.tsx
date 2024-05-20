import React from 'react';
import { fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '@utils/render-with-providers.test-util';
import { SignInForm } from './sign-in-form.module';

describe('SignIn', () => {
  test('email input accept text', async () => {
    const screen = renderWithProviders(<SignInForm />);
    const form = screen.container.querySelector('form') as HTMLFormElement;
    const emailInputNode = screen.container.querySelector('input[name=email]') as HTMLInputElement;
    expect(emailInputNode.value).toMatch('');
    await act(() => fireEvent.change(emailInputNode, { target: { value: 'testing' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch('testing');

    const errorMessage = screen.getByText('Email must be at example user@example.com');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(emailInputNode, { target: { value: ' test@test.com' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch(' test@test.com');

    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(emailInputNode, { target: { value: 'test@test.com ' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch('test@test.com ');

    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(emailInputNode, { target: { value: 'test @test.com' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch('test @test.com');

    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(emailInputNode, { target: { value: '@test.com' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch('@test.com');

    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(emailInputNode, { target: { value: '@test.com' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch('@test.com');

    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(emailInputNode, { target: { value: 'test@test.com' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch('test@test.com');

    expect(errorMessage).not.toBeInTheDocument();
  });

  test('snapshot match', () => {
    const { asFragment } = renderWithProviders(<SignInForm />);

    expect(asFragment()).toMatchSnapshot('sign-in-form-snapshot');
  });
});
