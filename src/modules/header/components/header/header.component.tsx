import React, { FC } from 'react';
import { AppBar, CircularProgress, Toolbar } from '@mui/material';
import { selectAuthorization } from '@store/auth/auth.slice';
import { selectAuthPending } from '@store/misc/misc.slice';
import { NavBar } from '../nav-bar/nav-bar.component';
import { Logo } from '../../../../components/logo-component/logo.component';
import { Cart } from '../cart/cart.component';
import { SignInBar } from '../sign-in-bar/sign-in-bar.component';
import { UserBar } from '../user-bar/user-bar.component';
import { useAppSelector } from '@/hooks/use-app-selector.hook';
import * as styles from './header.component.module.scss';

export const Header: FC = () => {
  const isAuthorized = useAppSelector(selectAuthorization);
  const isAuthPending = useAppSelector(selectAuthPending);

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Logo />
        <NavBar />
        {isAuthPending ? (
          <CircularProgress color="warning" />
        ) : isAuthorized ? (
          <UserBar />
        ) : (
          <SignInBar />
        )}
        <Cart />
      </Toolbar>
    </AppBar>
  );
};
