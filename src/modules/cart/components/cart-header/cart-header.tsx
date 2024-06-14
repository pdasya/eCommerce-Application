import React, { FC } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CustomRouterLink } from '@components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@routes/index';
import * as styles from './cart-header.module.scss';

const LinkToCatalogPage: FC = () => (
  <CustomRouterLink to={RoutePath.catalogDefault} className={styles.continueShoppingLink}>
    Continue Shopping
  </CustomRouterLink>
);

export const CartHeader: FC = () => (
  <Grid item xs={12} className={styles.cartModuleHeaderWrapper}>
    <Box textAlign="center" className={styles.cartHeader}>
      <Typography variant="h4" component="h2" gutterBottom>
        Your cart
      </Typography>
      <ShoppingCartIcon fontSize="large" className={styles.cartImage} />
    </Box>
    <Box textAlign="center" className={styles.cartContinueHeader}>
      <LinkToCatalogPage />
      <ArrowForwardIosIcon fontSize="small" />
    </Box>
  </Grid>
);
