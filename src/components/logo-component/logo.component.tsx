import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { RamenDining } from '@mui/icons-material';
import { RoutePath } from '@/routes';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import * as styles from './logo.component.module.scss';

export const Logo: FC = () => (
  <CustomRouterLink to={RoutePath.main} className={styles.logo}>
    <RamenDining sx={{ mr: 1 }} />

    <Typography
      variant="h6"
      noWrap
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}>
      FOOD STORE
    </Typography>
  </CustomRouterLink>
);
