import React, { FC } from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { NavBar } from '../nav-bar/nav-bar.component';
import { Logo } from '../logo/logo.component';
import { Cart } from '../cart/cart.component';
import styles from './header.component.module.scss';
import { SignInBar } from '../sign-in-bar/sign-in-bar.component';
import { UserBar } from '../user-bar/user-bar.component';
import { useAppSelector } from '@/hooks/use-app-selector.hook';
import { selectAuthorization } from '@/modules/auth/auth.slice';

export const Header: FC = () => {
  const isAuthorized = useAppSelector(selectAuthorization);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <Logo />
          <NavBar />
          {isAuthorized ? <UserBar /> : <SignInBar />}
          <Cart />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
