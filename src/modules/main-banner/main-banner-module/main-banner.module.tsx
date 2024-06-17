import React, { FC } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import * as styles from './main-banner.module.scss';

export const MainBanner: FC = () => (
  <Paper className={styles.banner}>
    <Grid container className={styles.banner} alignItems="center" justifyContent="center">
      <Grid item md={4} sm={6} xs={12} className={styles.bannerText}>
        <Typography variant="h4" component="h4" className={styles.bannerTitle}>
          Enjoy discounts
        </Typography>
        <Typography variant="h6" component="h6" className={styles.bannerSubtitle}>
          Promo code for everyone.{' '}
          <Typography paragraph>
            Use <span className={styles.bannerPromo}>promo20</span> and receive a 20% discount on
            your entire cart.
          </Typography>
        </Typography>
        <Typography variant="h6" component="h6" className={styles.bannerSubtitle}>
          Promo code for registered users.
          <Typography paragraph>
            Use <span className={styles.bannerPromo}>client30</span> and receive a 30% discount on
            your entire cart.
          </Typography>
        </Typography>
      </Grid>
      <Grid
        item
        className={styles.bannerImageContainer}
        md={8}
        sm={6}
        xs={12}
        alignItems="center"
        justifyContent="center">
        <img className={styles.bannerImage} src="./assets/images/banner.jpg" alt="banner" />
      </Grid>
    </Grid>
  </Paper>
);
