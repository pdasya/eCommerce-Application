import React, { FC } from 'react';
import { MainBanner } from '@modules/main-banner/index';
import styles from './main.page.module.scss';

export const MainPage: FC = () => (
  <div className={styles.page}>
    <MainBanner />
  </div>
);
