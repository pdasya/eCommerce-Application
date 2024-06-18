import React, { FC } from 'react';
import { SignInForm } from '@/modules/sign-in-form';
import * as styles from './sign-in.page.module.scss';

export const SignInPage: FC = () => (
  <div className={styles.page}>
    <SignInForm />
  </div>
);
