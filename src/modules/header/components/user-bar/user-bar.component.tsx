/* eslint-disable */
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Route } from '@/routes';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import styles from './user-bar.component.module.scss';
import { AccountCircle } from '@mui/icons-material';
import { useAppDispatch } from '@/hooks/use-app-dispatch.hook';
import { unauthorize } from '@/modules/auth/auth.slice';

// eslint-disable-next-line max-lines-per-function
export const UserBar: FC = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.bar}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <CustomRouterLink to={Route.profile}>Profile</CustomRouterLink>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(unauthorize({}));
          }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
