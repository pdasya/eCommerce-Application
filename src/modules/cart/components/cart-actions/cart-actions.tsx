import React, { FC } from 'react';
import { Box, Button } from '@mui/material';
import * as styles from './cart-actions.module.scss';

interface CartActionsProps {
  handleCartClear: () => void;
}

export const CartActions: FC<CartActionsProps> = ({ handleCartClear }) => (
  <Box style={{ display: 'flex', justifyContent: 'spaceBetween', gap: '15px' }}>
    <Button
      variant="contained"
      color="error"
      onClick={handleCartClear}
      className={styles.buttonSize}
      style={{ marginTop: 16 }}>
      Clear Cart
    </Button>
    <Button
      variant="contained"
      color="primary"
      className={styles.buttonSize}
      style={{ marginTop: 16 }}>
      Place your order
    </Button>
  </Box>
);
