import React, { FC } from 'react';
import { FormTemplate } from '../../../components/input-form/input-form.component';
// import * as Yup from 'yup';

/* eslint-disable max-lines-per-function */
export const SignUpForm: FC = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  // const validationSchema = Yup.object({
  //   username: Yup.string().required('Username is required'),
  //   email: Yup.string().email('Invalid email address').required('Email is required'),
  //   password: Yup.string().required('Password is required'),
  // });

  const handleSubmit = (values: Record<string, string>): void => {
    console.log('Form Values:', values);
  };

  const fields = [
    {
      id: 'username',
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
    },
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
      title="Sign Up"
      buttonText="Register"
      fields={fields}
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};
