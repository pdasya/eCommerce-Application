import React, { FC } from 'react';
import classNames from 'classnames';
import { Button } from '@mui/material';
import styles from './http-404.page.module.scss';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@/routes';

export const Http404Page: FC = () => (
  <div className={styles.page}>
    <div id="clouds">
      <div className={classNames(styles.cloud, styles.x1)} />
      <div className={classNames(styles.cloud, styles.x1Dot5)} />
      <div className={classNames(styles.cloud, styles.x2)} />
      <div className={classNames(styles.cloud, styles.x3)} />
      <div className={classNames(styles.cloud, styles.x4)} />
      <div className={classNames(styles.cloud, styles.x5)} />
      <div className={classNames(styles.cloud, styles.x6)} />
      <div className={classNames(styles.cloud, styles.x7)} />
      <div className={classNames(styles.cloud, styles.xx1)} />
      <div className={classNames(styles.cloud, styles.xx1Dot5)} />
      <div className={classNames(styles.cloud, styles.xx2)} />
      <div className={classNames(styles.cloud, styles.xx3)} />
      <div className={classNames(styles.cloud, styles.xx4)} />
      <div className={classNames(styles.cloud, styles.xx5)} />
      <div className={classNames(styles.cloud, styles.xx6)} />
      <div className={classNames(styles.cloud, styles.xx7)} />
      <div className={classNames(styles.cloud, styles.xxl1)} />
      <div className={classNames(styles.cloud, styles.xxl1Dot5)} />
      <div className={classNames(styles.cloud, styles.xxl2)} />
      <div className={classNames(styles.cloud, styles.xxl3)} />
      <div className={classNames(styles.cloud, styles.xxl4)} />
      <div className={classNames(styles.cloud, styles.xxl5)} />
      <div className={classNames(styles.cloud, styles.xxl6)} />
      <div className={classNames(styles.cloud, styles.xxl7)} />
    </div>
    <div className={styles.banner}>
      <div className={styles.banner404}>404</div>
      <hr className={styles.bannerHr} />
      <div className={styles.bannerTitle}>THE PAGE</div>
      <div className={styles.bannerSubtitle}>WAS NOT FOUND</div>
      <CustomRouterLink to={RoutePath.main}>
        <Button
          className={styles.bannerButton}
          variant="outlined"
          color="inherit"
          size="large"
          sx={{ ':hover': { backgroundColor: 'white' } }}>
          back to home
        </Button>
      </CustomRouterLink>
    </div>
  </div>
);
