import React, { FC } from 'react';
import { RoutePath } from '@routes/index';
import { CustomRouterLink } from '@components/custom-router-link/custom-router-link.component';
import { Button } from '@mui/material';
import styles from './main.page.module.scss';

export const MainPage: FC = () => {
  const navItems = [
    { caption: 'Home', path: RoutePath.main },
    { caption: 'Profile (authorized only)', path: RoutePath.profile },
    { caption: 'Register (unauthorized only)', path: RoutePath.signUp },
    { caption: 'Sign in (unauthorized only)', path: RoutePath.signIn },
    { caption: 'Catalog', path: RoutePath.catalog },
    { caption: 'Product', path: RoutePath.product },
    { caption: 'Cart', path: RoutePath.cart },
    { caption: 'About', path: RoutePath.about },
    { caption: '404', path: RoutePath.http404 },
    { caption: 'Error', path: RoutePath.error },
  ];

  return (
    <div className={styles.page}>
      <ul className={styles.list}>
        {navItems.map(item => (
          <li key={item.caption}>
            <CustomRouterLink to={item.path}>
              <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                {item.caption}
              </Button>
            </CustomRouterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
