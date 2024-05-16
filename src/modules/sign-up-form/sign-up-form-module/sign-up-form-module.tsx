import React, { FC, useState } from 'react';
import * as Yup from 'yup';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import { SignUpFormComponent } from '../sign-up-form-component/sign-up-form-component';
import { minPasswordLength } from '@/config/constants';
import { createCustomerInStore } from '../sign-up-form-api/sign-up-form-api';

export const SignUpForm: FC = () => {
  const minStreetNameLength = 1;
  const minAge = 13;

  const initialValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    shippingStreet: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: '',
    setDefaultShippingAddress: false,
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
    setDefaultBillingAddress: false,
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
    shippingStreet: Yup.string()
      .min(minStreetNameLength, 'Street must contain at least one character')
      .required('Street is required'),
    shippingCity: Yup.string()
      .matches(/^[A-Za-z]+$/, 'City must contain only alphabetic characters')
      .required('City is required'),
    shippingPostalCode: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, 'Postal code must be in the format 12345 or 12345-6789')
      .required('Postal code is required'),
    shippingCountry: Yup.string()
      .oneOf(['US'], 'Invalid country selection')
      .required('Country is required'),
    billingStreet: Yup.string()
      .min(minStreetNameLength, 'Street must contain at least one character')
      .required('Street is required'),
    billingCity: Yup.string()
      .matches(/^[A-Za-z]+$/, 'City must contain only alphabetic characters')
      .required('City is required'),
    billingPostalCode: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, 'Postal code must be in the format 12345 or 12345-6789')
      .required('Postal code is required'),
    billingCountry: Yup.string()
      .oneOf(['US'], 'Invalid country selection')
      .required('Country is required'),
  });

  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = async (values: Record<string, string>): Promise<void> => {
    const shippingAddress = {
      country: values.shippingCountry,
      city: values.shippingCity,
      streetName: values.shippingStreet,
      postalCode: values.shippingPostalCode,
    };

    const billingAddress = {
      country: values.billingCountry,
      city: values.billingCity,
      streetName: values.billingStreet,
      postalCode: values.billingPostalCode,
    };

    const customerDraft: CustomerDraft = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      addresses: [shippingAddress, billingAddress],
      defaultShippingAddress: values.setDefaultShippingAddress ? 0 : undefined,
      defaultBillingAddress: values.setDefaultBillingAddress ? 1 : undefined,
    };

    try {
      const response = await createCustomerInStore(customerDraft);
      console.log('Response:', response);
      setFormValues(initialValues);
      toast.success('Customer Successfully Created');
    } catch (error) {
      toast.error(`${error.message}`);
      console.error('Error creating customer:', error);
    }
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
      id: 'shippingStreet',
      name: 'shippingStreet',
      label: 'Street',
      type: 'text',
      required: true,
    },
    {
      id: 'shippingCity',
      name: 'shippingCity',
      label: 'City',
      type: 'text',
      required: true,
    },
    {
      id: 'shippingPostalCode',
      name: 'shippingPostalCode',
      label: 'Postal Code',
      type: 'text',
      required: true,
    },
    {
      id: 'shippingCountry',
      name: 'shippingCountry',
      label: 'Country',
      type: 'select',
      required: true,
      options: [{ label: 'United States', value: 'US' }],
    },
    {
      id: 'setDefaultShippingAddress',
      name: 'setDefaultShippingAddress',
      label: 'Set shipping address as default',
      type: 'switch',
    },
    {
      id: 'billingStreet',
      name: 'billingStreet',
      label: 'Street',
      type: 'text',
      required: true,
    },
    {
      id: 'billingCity',
      name: 'billingCity',
      label: 'City',
      type: 'text',
      required: true,
    },
    {
      id: 'billingPostalCode',
      name: 'billingPostalCode',
      label: 'Postal Code',
      type: 'text',
      required: true,
    },
    {
      id: 'billingCountry',
      name: 'billingCountry',
      label: 'Country',
      type: 'select',
      required: true,
      options: [{ label: 'United States', value: 'US' }],
    },
    {
      id: 'setDefaultBillingAddress',
      name: 'setDefaultBillingAddress',
      label: 'Set billing address as default',
      type: 'switch',
    },
  ];

  return (
    <SignUpFormComponent
      title="Sign Up"
      buttonText="Register"
      fields={fields}
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};
