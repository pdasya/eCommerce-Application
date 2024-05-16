import React, { FC } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { minPasswordLength, tokenCache, tokenStorage } from '@/config/constants';
import { IFormField, IUserDraft } from '@/modules/sign-in-form/interfaces/sign-in-form.interfaces';
import { signIn } from '../sign-in-form-api/sign-in-form.api';
import SignInFormComponent from '../sign-in-form-component/sign-in-form.component';
import { useAppDispatch } from '@/hooks/use-app-dispatch.hook';
import { authorize } from '@/modules/auth/auth.slice';

export const SignInForm: FC = () => {
  const dispatch = useAppDispatch();
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
    await signIn(userDraft)
      .then(response => {
        tokenStorage.set('token', tokenCache.get());
        dispatch(
          authorize({
            id: response.body.customer.id,
            email: response.body.customer.email,
          }),
        );
      })
      .catch(error => {
        if (error.status === 400) {
          toast.error('Incorrect email or password.');
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
      buttonText="Sign In"
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};
