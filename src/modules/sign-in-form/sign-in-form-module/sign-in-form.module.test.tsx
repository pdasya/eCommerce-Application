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

    let errorMessage = screen.getByText('Email must be at example user@example.com');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(emailInputNode, { target: { value: '@test.com' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch('@test.com');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(emailInputNode, { target: { value: 'test@test' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch('test@test');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(emailInputNode, { target: { value: ' test@test.com' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch(' test@test.com');
    errorMessage = screen.getByText('Email should not contain spaces');

    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(emailInputNode, { target: { value: 'test@test.com ' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch('test@test.com ');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(emailInputNode, { target: { value: 'test @test.com' } }));
    await act(() => fireEvent.submit(form));
    expect(emailInputNode.value).toMatch('test @test.com');
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

  test('password input accept text', async () => {
    const screen = renderWithProviders(<SignInForm />);
    const form = screen.container.querySelector('form') as HTMLFormElement;
    const passwordInputNode = screen.container.querySelector(
      'input[name=password]',
    ) as HTMLInputElement;

    expect(passwordInputNode.value).toMatch('');
    await act(() => fireEvent.change(passwordInputNode, { target: { value: 'testing' } }));
    await act(() => fireEvent.submit(form));
    expect(passwordInputNode.value).toMatch('testing');

    let errorMessage = screen.getByText('Password must be at least 8 characters long');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(passwordInputNode, { target: { value: 'passworld' } }));
    await act(() => fireEvent.submit(form));
    expect(passwordInputNode.value).toMatch('passworld');

    errorMessage = screen.getByText(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    );
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(passwordInputNode, { target: { value: 'pass1234' } }));
    await act(() => fireEvent.submit(form));
    expect(passwordInputNode.value).toMatch('pass1234');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(passwordInputNode, { target: { value: 'passWORLD' } }));
    await act(() => fireEvent.submit(form));
    expect(passwordInputNode.value).toMatch('passWORLD');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(passwordInputNode, { target: { value: '12345678' } }));
    await act(() => fireEvent.submit(form));
    expect(passwordInputNode.value).toMatch('12345678');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(passwordInputNode, { target: { value: ' paSS1234' } }));
    await act(() => fireEvent.submit(form));
    expect(passwordInputNode.value).toMatch(' paSS1234');
    expect(errorMessage).toBeInTheDocument();

    errorMessage = screen.getByText('Password should not contain spaces');

    await act(() => fireEvent.change(passwordInputNode, { target: { value: 'paSS1234 ' } }));
    await act(() => fireEvent.submit(form));
    expect(passwordInputNode.value).toMatch('paSS1234 ');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(passwordInputNode, { target: { value: 'paSS 1234' } }));
    await act(() => fireEvent.submit(form));
    expect(passwordInputNode.value).toMatch('paSS 1234');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(passwordInputNode, { target: { value: 'pass1234' } }));
    await act(() => fireEvent.submit(form));
    expect(passwordInputNode.value).toMatch('pass1234');
    expect(errorMessage).toBeInTheDocument();

    await act(() => fireEvent.change(passwordInputNode, { target: { value: 'paSS1234' } }));
    await act(() => fireEvent.submit(form));
    expect(passwordInputNode.value).toMatch('paSS1234');

    expect(errorMessage).not.toBeInTheDocument();
  });

  test('snapshot match', () => {
    const { asFragment } = renderWithProviders(<SignInForm />);
    expect(asFragment()).toMatchSnapshot('sign-in-form-snapshot');
  });
});
