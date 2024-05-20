import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import { IFormField } from '@modules/sign-up-form/sign-up-form-component/sign-up-form-component';
import userEvent from '@testing-library/user-event';
import FieldComponent from './field-component';
import '@testing-library/jest-dom';

const TestForm = ({
  fieldProps,
  initialValues,
  onSubmit,
}: {
  fieldProps: IFormField;
  initialValues: Record<string, string | boolean>;
  onSubmit: (values: Record<string, string | boolean>) => void;
}) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    {() => <FieldComponent field={fieldProps} />}
  </Formik>
);

describe('FieldComponent', () => {
  const onSubmit = jest.fn();

  it('renders a select field and handles selection', async () => {
    const fieldProps = {
      id: 'country',
      name: 'country',
      label: 'Country',
      type: 'select',
      options: [
        { label: 'USA', value: 'USA' },
        { label: 'Canada', value: 'Canada' },
      ],
      required: true,
    };
    const initialValues = { country: '' };

    render(<TestForm fieldProps={fieldProps} initialValues={initialValues} onSubmit={onSubmit} />);
    const select = screen.getByRole('combobox');
    userEvent.click(select);

    const optionUSA = await screen.findByRole('option', { name: 'USA' });
    userEvent.click(optionUSA);

    await waitFor(() => {
      expect(optionUSA).toHaveAttribute('aria-selected', 'true');
    });
  });

  // it('renders a password field and validates input', async () => {
  //   const fieldProps = {
  //     id: 'password',
  //     name: 'password',
  //     label: 'Password',
  //     type: 'password',
  //     required: true
  //   };
  //   const initialValues = { password: '' };

  //   render(<TestForm fieldProps={fieldProps} initialValues={initialValues} onSubmit={onSubmit} />);

  //   const input = screen.getByLabelText('Password');
  //   await userEvent.type(input, 'password123');
  //   expect(input).toHaveValue('password123');
  // });

  it('renders a switch and toggles its state', async () => {
    const fieldProps = {
      id: 'newsletter',
      name: 'newsletter',
      label: 'Subscribe to newsletter',
      type: 'switch',
    };
    const initialValues = { newsletter: false };

    render(<TestForm fieldProps={fieldProps} initialValues={initialValues} onSubmit={onSubmit} />);
    const toggle = screen.getByRole('checkbox');
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it('renders a checkbox and toggles its state', async () => {
    const fieldProps = {
      id: 'agree',
      name: 'agree',
      label: 'I agree to the terms',
      type: 'checkbox',
    };
    const initialValues = { agree: false };

    render(<TestForm fieldProps={fieldProps} initialValues={initialValues} onSubmit={onSubmit} />);
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  // it('displays an error when the field is touched but invalid', async () => {
  //   const fieldProps = {
  //     id: 'email',
  //     name: 'email',
  //     label: 'Email',
  //     type: 'text',
  //     required: true,
  //   };
  //   const initialValues = { email: '' };

  //   render(<TestForm fieldProps={fieldProps} initialValues={initialValues} onSubmit={onSubmit} />);
  //   const emailInput = screen.getByRole('textbox', { name: /Email/i });
  //   await userEvent.type(emailInput, 'invalidemail');
  //   await userEvent.tab();
  //   await waitFor(() => expect(screen.getByText('Invalid email address')).toBeInTheDocument());
  // });
  it('matches the component snapshot', () => {
    const fieldProps = {
      id: 'testInput',
      name: 'testInput',
      label: 'Test Input',
      type: 'text',
      required: true,
    };
    const initialValues = { testInput: '' };

    const { asFragment } = render(
      <TestForm fieldProps={fieldProps} initialValues={initialValues} onSubmit={onSubmit} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
