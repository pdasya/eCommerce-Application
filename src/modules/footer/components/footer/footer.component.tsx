import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { RoutePath } from '@routes/index';
import { Logo } from '@components/logo-component/logo.component';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectAuthorization } from '@store/auth/auth.slice';
import { NavFooter } from '../nav-footer/nav-footer.component';
import styles from './footer.component.module.scss';

export const Footer: FC = () => {
  const isAuthorized = useAppSelector(selectAuthorization);
  const navItemsCustomers = {
    title: 'Company information',
    links: [
      { id: 1, caption: 'About', href: RoutePath.about },
      { id: 2, caption: 'Catalog', href: RoutePath.catalogDefault },
    ],
  };

  const navItemsUser = {
    title: 'Customer services',
    links: [
      { id: 1, caption: 'Profile', href: isAuthorized ? RoutePath.profile : RoutePath.signIn },
    ],
  };

  const navItemsContacts = {
    title: 'Contacts',
    links: [
      { id: 1, caption: '+123-456-78910', href: 'tel:+123-456-78910', icon: <PhoneIcon /> },
      {
        id: 2,
        caption: 'admin@foodstore.com',
        href: 'mailto:admin@foodstore.com',
        icon: <EmailIcon />,
      },
    ],
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBlock}>
        <div className={styles.footerBlockLogo}>
          <Logo />
          <p className={styles.footerBlockText}>
            Welcome to our online store! Our mission is to bring true Japanese flavours to you.
          </p>
        </div>
        <div className={styles.footerBlockLinks}>
          <NavFooter {...navItemsCustomers} />
        </div>
        <div className={styles.footerBlockLinks}>
          <NavFooter {...navItemsUser} />
        </div>
        <div className={styles.footerBlockLinks}>
          <NavFooter {...navItemsContacts} />
        </div>
      </div>
      <Grid container className={styles.footerCredential}>
        <Grid item>© 2024 &laquo;Vikings in Pajamas&raquo;</Grid>
      </Grid>
    </footer>
  );
};
