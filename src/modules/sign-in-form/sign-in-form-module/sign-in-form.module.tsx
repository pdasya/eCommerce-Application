import React, { FC } from 'react';
import * as Yup from 'yup';
import { minPasswordLength, tokenCache, tokenStorage } from '@/config/constants';
import SignInFormComponent from '../sign-in-form-component/sign-in-form.component';
import { IUserDraft } from '@/modules/sign-in-form/interface/sign-in-form';
import { existCustomerByEmail, signIn } from '../sign-in-form-api/sign-in-form-api';

export const SignInForm: FC = () => {
  const initialValues: IUserDraft = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .test('Check email', 'Email should not contain spaces', value => !value?.includes(' '))
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)$/,
        'Email must be at example user@example.com',
      )
      .required('Email is required'),
    password: Yup.string()
      .min(minPasswordLength, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      )
      .test('Check password', 'Password should not contain spaces', value => !value?.includes(' '))
      .required('Password is required'),
  });

  const handleSubmit = async (values: IUserDraft): Promise<void> => {
    const userDraft: IUserDraft = {
      email: values.email,
      password: values.password,
    };
    await existCustomerByEmail(values.email).then(({ body }) => {
      if (body.results.length === 0) {
        console.error(`User with email ${values.email} is not registered`);
      } else {
        signIn(userDraft)
          .then(() => {
            tokenStorage.set('token', tokenCache.get());
            console.log('User was logged!');
          })
          .catch(() => {
            console.error('Incorrect password');
          });
      }
    });
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
      buttonText="Sing In"
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};
