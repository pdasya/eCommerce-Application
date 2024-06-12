import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import styles from './about-module.module.scss';

export const AboutContent: FC = () => (
  <>
    <Typography variant="h1" component="h1" className={styles.title}>
      About Us
    </Typography>
    <Box sx={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <p>
        We&apos;re a team of web developers, united by a common goal: to create an e-Commerce
        application. This project is not only our first experience of collaboration but also our
        first try into React development.
      </p>
      <p>
        Our journey into React development has been both challenging and rewarding. As we dove into
        the intricacies of React components and hooks, we found ourselves continuously learning and
        adapting to new methodologies. Also, this project has allowed us to experiment with state
        management techniques, pushing our development skills to new heights.
      </p>
    </Box>
  </>
);
