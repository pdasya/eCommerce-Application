import React, { FC } from 'react';
import { HourglassEmpty } from '@mui/icons-material';
import styles from './loading-banner.component.module.scss';

export const LoadingBanner: FC = () => (
  <div className={styles.root}>
    <h1>
      Loading <HourglassEmpty />
    </h1>
  </div>
);
