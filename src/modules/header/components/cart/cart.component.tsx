import React, { FC } from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectCartItemsQuantity } from '@store/cart/cart.slice';
import { RoutePath } from '@/routes';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import * as styles from './cart.component.module.scss';

export const Cart: FC = () => {
  const amount = useAppSelector(selectCartItemsQuantity);

  return (
    <CustomRouterLink to={RoutePath.cart} className={styles.cart} activeClassName={styles.active}>
      <Tooltip title="Cart">
        <IconButton aria-label="cart" color="inherit">
          <Badge badgeContent={amount} invisible={amount <= 0} color="secondary" max={9}>
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Tooltip>
    </CustomRouterLink>
  );
};
