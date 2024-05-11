/* eslint-disable */
import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Route } from '@/routes';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import styles from './sign-in-bar.component.module.scss';
import { HowToReg, Login } from '@mui/icons-material';

// eslint-disable-next-line max-lines-per-function
export const SignInBar: FC = () => (
  <div className={styles.bar}>
    <CustomRouterLink to={Route.signIn}>
      <Button
        sx={{
          display: { xs: 'none', sm: 'flex' },
        }}
        variant="outlined"
        color="inherit"
        size="small">
        sign&nbsp;in
      </Button>
      <Tooltip title="Sign in">
        <IconButton
          sx={{
            display: { xs: 'flex', sm: 'none' },
          }}
          aria-label="sign in"
          color="inherit">
          <Login />
        </IconButton>
      </Tooltip>
    </CustomRouterLink>

    <Typography
      color="inherit"
      component="div"
      sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
      or
    </Typography>

    <CustomRouterLink to={Route.signUp}>
      <Button
        sx={{
          display: { xs: 'none', sm: 'flex' },
        }}
        variant="outlined"
        color="inherit"
        size="small">
        register
      </Button>
      <Tooltip title="Sign up">
        <IconButton
          sx={{
            display: { xs: 'flex', sm: 'none' },
          }}
          aria-label="sign up"
          color="inherit">
          <HowToReg />
        </IconButton>
      </Tooltip>
    </CustomRouterLink>
  </div>
);
