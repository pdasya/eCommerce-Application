import { Button } from '@mui/base';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { FC } from 'react';
import styles from './cart-module.module.scss';

export const CartModule: FC = () => (
  <Grid container spacing={2} className={styles.cartModuleWrapper}>
    <Grid item>
      <Box textAlign="center">
        <Typography variant="h4" component="h2" gutterBottom>
          Your cart
        </Typography>
        <Typography variant="body2" component="p" color="primary" gutterBottom>
          Continue Shopping
        </Typography>
      </Box>
    </Grid>
    <Grid item>
      <Box className={styles.cartModuleContent}>
        <Typography variant="body1" gutterBottom>
          Your cart is empty
        </Typography>
        <Button>Continue Shopping</Button>
      </Box>
    </Grid>
  </Grid>
);
