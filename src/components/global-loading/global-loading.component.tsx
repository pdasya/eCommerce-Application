import React, { FC } from 'react';
import { LinearProgress } from '@mui/material';
import classNames from 'classnames';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectLoading } from '@store/misc/misc.slice';
import * as styles from './global-loading.component.module.scss';

export const GlobalLoading: FC = () => {
  const isLoading = useAppSelector(selectLoading);

  return (
    <div className={classNames(styles.container, isLoading ? '' : styles.hidden)}>
      <LinearProgress />
    </div>
  );
};
