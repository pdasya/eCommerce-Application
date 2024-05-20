import React, { FC } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { unauthorize } from '@store/auth/auth.slice';
import { client, tokenStorage } from '@config/constants';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import { useAppDispatch } from '@/hooks/use-app-dispatch.hook';
import styles from './user-bar.component.module.scss';

export const UserBar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.bar}>
      <Tooltip title="Account">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit">
          <AccountCircle />
        </IconButton>
      </Tooltip>
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
          <CustomRouterLink to={RoutePath.profile}>Profile</CustomRouterLink>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            tokenStorage.clear();
            navigate('/');
            client.anonymousSession();
            dispatch(unauthorize({}));
          }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
