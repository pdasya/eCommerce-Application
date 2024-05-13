import React, { FC } from 'react';
import * as Yup from 'yup';
import { minPasswordLength } from '@/config/constants';
import SignInFormComponent from '@/modules/sign-in-form/sign-in-form-component/sign-in-form.component';
import { LoginValues } from '@/interfaces/login-form';
import { apiRoot } from '@/commercetools/client';

export const SignInForm: FC = () => {
  const initialValues: LoginValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)$/,
        "Email must be at example user@example.com and doesn't have spaces",
      )
      .required('Email is required'),
    password: Yup.string()
      .min(minPasswordLength, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      )
      .test('Check password', 'Password must not contain spaces', value => !value?.includes(' '))
      .required('Password is required'),
  });

  const handleSubmit = async (values: LoginValues): Promise<void> => {
    try {
      const request = await apiRoot
        .me()
        .login()
        .post({
          body: {
            email: values.email,
            password: values.password,
          },
        })
        .execute();
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const fields = [
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
    },
  ];

  return (
    <SignInFormComponent
      title="Sign In"
      buttonText="Login"
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};
