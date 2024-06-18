import React, { FC } from 'react';
import { CustomRouterLink } from '@components/custom-router-link/custom-router-link.component';
import { List, ListItem, Typography } from '@mui/material';
import * as styles from './nav-footer.component.module.scss';

interface NavFooterLinkOptions {
  id: number;
  caption: string;
  href: string;
  icon?: React.JSX.Element;
}

interface NavFooterOptions {
  title: string;
  links: NavFooterLinkOptions[];
}

export const NavFooter: FC<NavFooterOptions> = ({ title, links }) => (
  <>
    <Typography component="h6" variant="h6">
      {title}
    </Typography>
    <List disablePadding>
      {links.map(link => (
        <ListItem key={link.id} disablePadding className={styles.listItem}>
          <CustomRouterLink to={link.href} className={styles.listLink}>
            {link.icon ?? ''} {link.caption}
          </CustomRouterLink>
        </ListItem>
      ))}
    </List>
  </>
);
