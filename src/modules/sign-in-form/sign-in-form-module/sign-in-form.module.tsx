import React, { FC, useState } from 'react';
import * as Yup from 'yup';
import { minPasswordLength, tokenCache, tokenStorage } from '@/config/constants';
import SignInFormComponent from '../sign-in-form-component/sign-in-form.component';
import { IUserDraft } from '@/modules/sign-in-form/interface/sign-in-form';
import { signIn } from '../sign-in-form-api/sign-in-form-api';

export const SignInForm: FC = () => {
  const [message, setMessage] = useState('');
  const initialValues: IUserDraft = {
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

  const handleSubmit = async (values: IUserDraft): Promise<void> => {
    const userDraft: IUserDraft = {
      email: values.email,
      password: values.password,
    };
    await signIn(userDraft)
      .then(response => {
        tokenStorage.set('token', tokenCache.get());
        console.log(response);
        setMessage('User was logined!');
      })
      .catch(error => {
        console.error(error);
        setMessage('User was not logined! Check your email or password.');
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
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        {message}
      </div>
      <SignInFormComponent
        title="Sign In"
        buttonText="Login"
        fields={fields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      />
    </>
  );
};
