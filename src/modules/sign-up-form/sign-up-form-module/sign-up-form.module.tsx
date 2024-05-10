import React, { FC } from 'react';
import * as Yup from 'yup';
import { FormTemplate } from '../../../components/input-form/input-form.component';
import { minPasswordLength } from '@/config/constants';

/* eslint-disable max-lines-per-function */
export const SignUpForm: FC = () => {
  const minStreetNameLength = 1;
  const minAge = 13;

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

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(minPasswordLength, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      )
      .required('Password is required'),
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'First name must contain only alphabetic characters')
      .required('First name is required'),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Last name must contain only alphabetic characters')
      .required('Last name is required'),
    dateOfBirth: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - minAge)),
        'You must be at least 13 years old',
      )
      .required('Date of birth is required'),
    street: Yup.string()
      .min(minStreetNameLength, 'Street must contain at least one character')
      .required('Street is required'),
    city: Yup.string()
      .matches(/^[A-Za-z]+$/, 'City must contain only alphabetic characters')
      .required('City is required'),
    postalCode: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, 'Postal code must be in the format 12345 or 12345-6789')
      .required('Postal code is required'),
    country: Yup.string()
      .oneOf(['US'], 'Invalid country selection')
      .required('Country is required'),
  });

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
      options: [{ label: 'United States', value: 'US' }],
    },
  ];

  return (
    <FormTemplate
      title="Sign Up"
      buttonText="Register"
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};
