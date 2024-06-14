import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';
import classNames from 'classnames';
import * as styles from './full-size-loading.component.module.scss';

type FullSizeLoadingProps = {
  isLoading?: boolean;
};

export const FullSizeLoading: FC<FullSizeLoadingProps> = ({ isLoading = false }) => (
  <div className={classNames(styles.container, !isLoading && styles.hidden)}>
    <CircularProgress />
  </div>
);
