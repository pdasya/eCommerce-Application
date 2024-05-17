import React, { FC, useState } from 'react';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import { SignUpFormComponent } from '../sign-up-form-component/sign-up-form-component';
import { createCustomerInStore } from '../sign-up-form-api/sign-up-form-api';
import { tokenCache, tokenStorage } from '@/config/constants';
import { authorize } from '@/modules/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch.hook';

export const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
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
    setSameBillingAddress: false,
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
    setDefaultBillingAddress: false,
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = async (values: Record<string, string>): Promise<void> => {
    const shippingAddress = {
      country: values.shippingCountry,
      city: values.shippingCity,
      streetName: values.shippingStreet,
      postalCode: values.shippingPostalCode,
    };

    const billingAddress = values.setSameBillingAddress
      ? shippingAddress
      : {
          country: values.billingCountry,
          city: values.billingCity,
          streetName: values.billingStreet,
          postalCode: values.billingPostalCode,
        };

    const customerDraft: CustomerDraft = values.setSameBillingAddress
      ? {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth,
          addresses: [shippingAddress],
          defaultShippingAddress: values.setDefaultShippingAddress ? 0 : undefined,
          defaultBillingAddress: values.setDefaultShippingAddress ? 0 : undefined,
          shippingAddresses: [0],
          billingAddresses: [0],
        }
      : {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth,
          addresses: [shippingAddress, billingAddress],
          defaultShippingAddress: values.setDefaultShippingAddress ? 0 : undefined,
          defaultBillingAddress: values.setDefaultBillingAddress ? 1 : undefined,
          shippingAddresses: [0],
          billingAddresses: [1],
        };

    try {
      const response = await createCustomerInStore(customerDraft);
      console.log('Response:', response);
      setFormValues(initialValues);
      toast.success('Customer Successfully Created');
      const userDraft: IUserDraft = {
        email: values.email,
        password: values.password,
      };

      client
        .passwordSession(userDraft)
        .me()
        .login()
        .post({
          body: userDraft,
        })
        .execute()
        .then(() => {
          tokenStorage.set('token', tokenCache.get());
        });

      dispatch(
        authorize({
          id: response.body.customer.id,
          email: response.body.customer.email,
        }),
      );
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
      label: 'Set address as default',
      type: 'switch',
    },
    {
      id: 'setSameBillingAddress',
      name: 'setSameBillingAddress',
      label: 'Also use as billing address',
      type: 'checkbox',
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
      options: [{ label: 'United States', value: 'US' }],
      required: true,
    },
    {
      id: 'setDefaultBillingAddress',
      name: 'setDefaultBillingAddress',
      label: 'Set address as default',
      type: 'switch',
    },
  ];

  return (
    <SignUpFormComponent
      title="Sign Up"
      buttonText="Register"
      fields={fields}
      initialValues={formValues}
      onSubmit={handleSubmit}
    />
  );
};
