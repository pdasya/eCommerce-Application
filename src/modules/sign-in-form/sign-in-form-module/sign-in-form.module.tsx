import React, { FC } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { authorize } from '@store/auth/auth.slice';
import { baseSchema } from '@utils/validation-schema';
import { tokenCache, tokenName, tokenStorage } from '@/config/constants';
import { IFormField, IUserDraft } from '@/modules/sign-in-form/interfaces/sign-in-form.interfaces';
import { signIn } from '../sign-in-form-api/sign-in-form.api';
import SignInFormComponent from '../sign-in-form-component/sign-in-form.component';
import { useAppDispatch } from '@/hooks/use-app-dispatch.hook';

export const SignInForm: FC = () => {
  const dispatch = useAppDispatch();
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
    await signIn(userDraft)
      .then(response => {
        toast.success('Login successful!');
        dispatch(
          authorize({
            id: response.body.customer.id,
            email: response.body.customer.email,
          }),
        );
      })
      .then(() => {
        tokenStorage.set(tokenName, tokenCache.get());
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
