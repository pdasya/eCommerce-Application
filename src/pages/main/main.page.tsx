import React, { FC } from 'react';
import { MainBanner } from '@modules/main/main-banner/index';
import { MainGoodsSale } from '@modules/main/main-product-sales';
import * as styles from './main.page.module.scss';

export const MainPage: FC = () => (
  <div className={styles.page}>
    <MainBanner />
    <MainGoodsSale />
  </div>
);
