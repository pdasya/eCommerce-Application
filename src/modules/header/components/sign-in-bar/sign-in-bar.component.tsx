import React, { FC } from 'react';
import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import { HowToReg, Login } from '@mui/icons-material';
import { RoutePath } from '@/routes';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';

import styles from './sign-in-bar.component.module.scss';

export const SignInBar: FC = () => (
  <div className={styles.bar}>
    <CustomRouterLink to={RoutePath.signIn}>
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

    <CustomRouterLink to={RoutePath.signUp}>
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
