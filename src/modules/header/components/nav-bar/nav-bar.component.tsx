import React, { FC } from 'react';
import { useMatch, useResolvedPath } from 'react-router-dom';
import { Box, Button, IconButton, MenuItem, Tooltip, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@/routes';
import * as styles from './nav-bar.component.module.scss';

export const NavBar: FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const navItems = [
    { caption: 'Home', path: RoutePath.main, isFullMatch: true },
    {
      caption: 'Catalog',
      path: RoutePath.catalogDefault,
      rootPath: RoutePath.catalogBlank,
      isFullMatch: false,
    },
    { caption: 'About Us', path: RoutePath.about, isFullMatch: true },
  ];

  return (
    <div className={styles.bar}>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <Tooltip title="Menu">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit">
            <MenuIcon />
          </IconButton>
        </Tooltip>

        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}>
          {navItems.map(item => (
            <MenuItem key={item.path} onClick={handleCloseNavMenu} role="navigation">
              <CustomRouterLink to={item.path} key={item.caption}>
                <Typography textAlign="center">{item.caption}</Typography>
              </CustomRouterLink>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '3px',
          display: { xs: 'none', md: 'flex' },
        }}>
        {navItems.map(({ caption, path, isFullMatch = true, rootPath = path }) => (
          <CustomRouterLink to={path} key={caption} role="navigation">
            <Button
              variant="contained"
              sx={{ color: '#fff' }}
              size="small"
              color={
                useMatch({ path: useResolvedPath(rootPath).pathname, end: isFullMatch })
                  ? 'warning'
                  : 'primary'
              }>
              {caption}
            </Button>
          </CustomRouterLink>
        ))}
      </Box>
    </div>
  );
};
