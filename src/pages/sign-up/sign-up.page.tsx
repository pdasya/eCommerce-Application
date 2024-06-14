import React, { FC } from 'react';
import { SignUpForm } from '@/modules/sign-up-form';
import * as styles from './sign-up.page.module.scss';

export const SignUpPage: FC = () => (
  <div className={styles.page}>
    <SignUpForm />
  </div>
);
