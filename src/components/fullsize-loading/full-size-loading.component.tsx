import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';
import styles from './full-size-loading.component.module.scss';

type FullSizeLoadingProps = {
  isLoading?: boolean;
};

export const FullSizeLoading: FC<FullSizeLoadingProps> = ({ isLoading = false }) => (
  <div className={isLoading ? styles.container : styles.hidden}>
    <CircularProgress />
  </div>
);
