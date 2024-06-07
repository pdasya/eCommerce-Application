import React, { FC } from 'react';
import { Button } from '@mui/material';
import classNames from 'classnames';
import styles from './error.page.module.scss';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@/routes';

export const ErrorPage: FC = () => (
  <div className={styles.page}>
    <h1 className={styles.title}>
      Unexpected Error <b>:(</b>
    </h1>
    <h2 className={styles.subtitle}>Whoops! Something went wrong</h2>
    <div className={styles.gears}>
      <div className={classNames(styles.gear, styles.one)}>
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </div>
      <div className={classNames(styles.gear, styles.two)}>
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </div>
      <div className={classNames(styles.gear, styles.three)}>
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </div>
    </div>

    <CustomRouterLink to={RoutePath.main}>
      <Button variant="contained" size="large">
        go to main page
      </Button>
    </CustomRouterLink>
  </div>
);
