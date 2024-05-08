import { Button, InputLabel } from '@mui/material';
import React, { FC } from 'react';
import styles from './test-cart.component.module.scss';

export const DummyCart: FC = () => (
  <div className={styles.cart}>
    <div className={styles.cart__counter}>
      <Button>+</Button>
      <InputLabel>0</InputLabel>
      <Button>-</Button>
    </div>
  </div>
);
