import React, { FC } from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { RoutePath } from '@/routes';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import styles from './cart.component.module.scss';

export const Cart: FC = () => (
  <CustomRouterLink to={RoutePath.cart} className={styles.cart}>
    <Tooltip title="Cart">
      <IconButton aria-label="cart" color="inherit">
        <ShoppingCart />
      </IconButton>
    </Tooltip>
  </CustomRouterLink>
);
