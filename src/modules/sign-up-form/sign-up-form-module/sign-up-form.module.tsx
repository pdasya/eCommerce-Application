import React, { FC, useState } from 'react';
import { FormTemplate } from '../../../components/input-form/input-form.component';

/* eslint-disable max-lines-per-function */
export const SignUpForm: FC = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setForm(previousForm => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  const fields = [
    {
      id: 'username',
      name: 'username',
      label: 'Username',
      type: 'text',
      value: form.username,
      onChange: handleChange,
      required: true,
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      type: 'email',
      value: form.email,
      onChange: handleChange,
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      label: 'Password',
      type: 'password',
      value: form.password,
      onChange: handleChange,
      required: true,
    },
  ];

  return (
    <FormTemplate title="Sign Up" buttonText="Register" fields={fields} onSubmit={handleSubmit} />
  );
};
