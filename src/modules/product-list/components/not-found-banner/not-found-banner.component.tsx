import React, { FC } from 'react';
import { Search } from '@mui/icons-material';
import * as styles from './not-found-banner.component.module.scss';

export const NotFoundBanner: FC = () => (
  <div className={styles.root}>
    <h1>
      No results found <Search />
    </h1>
  </div>
);
