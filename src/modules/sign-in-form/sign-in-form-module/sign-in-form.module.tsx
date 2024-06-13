import React, { FC } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { baseSchema } from '@config/validation-schema';
import { IFormField, IUserDraft } from '@/modules/sign-in-form/interfaces/sign-in-form.interfaces';
import SignInFormComponent from '../sign-in-form-component/sign-in-form.component';
import { authService } from '@/services/auth.service';

export const SignInForm: FC = () => {
  const initialValues: IUserDraft = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: baseSchema.email,
    password: baseSchema.password,
  });

  const handleSubmit = async (values: IUserDraft): Promise<void> => {
    const userDraft: IUserDraft = {
      email: values.email,
      password: values.password,
    };
    authService
      .signIn(userDraft)
      .then(() => {
        toast.success('Login successful!');
      })
      .catch(error => {
        if (error.statusCode === 400) {
          toast.error('Incorrect email or password.');
        } else {
          toast.error('Bad request');
        }
      });
  };

  const fields: IFormField[] = [
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
