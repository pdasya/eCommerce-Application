import React, { FC } from 'react';
import { Pagination, PaginationItem, useMediaQuery, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

type CustomPaginationProps = {
  pageCount: number;
};

export const CustomPagination: FC<CustomPaginationProps> = ({ pageCount }) => {
  const location = useLocation();
  const currentPathName = location.pathname;
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Pagination
      count={pageCount}
      page={page}
      boundaryCount={1}
      siblingCount={0}
      size={isSmallScreen ? 'small' : 'medium'}
      renderItem={item => (
        <PaginationItem
          component={Link}
          to={`${currentPathName}${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
};
