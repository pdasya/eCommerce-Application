import React, { FC } from 'react';
// import * as Yup from 'yup';
import { FormTemplate } from '../../../components/input-form/input-form.component';

/* eslint-disable max-lines-per-function */
export const SignInForm: FC = () => {
  // const minPasswordLength = 8;

  const initialValues = {
    email: '',
    password: '',
  };

  // const validationSchema = Yup.object({
  //   email: Yup.string().email('Invalid email address').required('Email is required'),
  //   password: Yup.string()
  //     .min(minPasswordLength, 'Password must be at least 8 characters long')
  //     .matches(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
  //       'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  //     )
  //     .required('Password is required'),
  // });

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
  ];

  return (
    <FormTemplate
      title="Sign In"
      buttonText="Login"
      fields={fields}
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};
