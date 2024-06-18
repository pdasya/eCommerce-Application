import React, { FC } from 'react';
import { Box, Button } from '@mui/material';
import * as styles from './cart-actions.module.scss';

interface CartActionsProps {
  handleCartClear: () => void;
}

export const CartActions: FC<CartActionsProps> = ({ handleCartClear }) => (
  <Box className={styles.buttonWrapper}>
    <Button
      variant="contained"
      color="error"
      onClick={handleCartClear}
      className={styles.buttonSize}>
      Clear Cart
    </Button>
    <Button variant="contained" color="primary" className={styles.buttonSize}>
      Place your order
    </Button>
  </Box>
);
