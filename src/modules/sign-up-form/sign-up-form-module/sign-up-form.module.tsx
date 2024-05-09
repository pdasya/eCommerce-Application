import React, { FC } from 'react';
import { FormTemplate } from '../../../components/input-form/input-form.component';

/* eslint-disable max-lines-per-function */
export const SignUpForm: FC = () => {
  const initialValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  };

  const handleSubmit = (values: Record<string, string>): void => {
    console.log('Form Values:', values);
  };

  const fields = [
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
    },
    {
      id: 'firstName',
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
    },
    {
      id: 'lastName',
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
    },
    {
      id: 'dateOfBirth',
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      required: true,
    },
    {
      id: 'street',
      name: 'street',
      label: 'Street',
      type: 'text',
      required: true,
    },
    {
      id: 'city',
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
    },
    {
      id: 'postalCode',
      name: 'postalCode',
      label: 'Postal Code',
      type: 'text',
      required: true,
    },
    {
      id: 'country',
      name: 'country',
      label: 'Country',
      type: 'select',
      required: true,
      options: [
        { label: 'United States', value: 'US' },
        { label: 'Canada', value: 'CA' },
        { label: 'United Kingdom', value: 'UK' },
      ],
    },
  ];

  return (
    <FormTemplate
      title="Sign Up"
      buttonText="Register"
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
};
