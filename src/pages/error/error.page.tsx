import React, { FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Http404Page } from '@pages/http-404/http-404.page';
import { Button } from '@mui/material';
import styles from './error.page.module.scss';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@/routes';

export const ErrorPage: FC = () => {
  const error = useRouteError();

  const matcher = () => {
    if (isRouteErrorResponse(error) && error.status === 404) {
      return <Http404Page />;
    }

    return (
      <div>
        <p>Something went wrong</p>
        <CustomRouterLink to={RoutePath.main}>
          <Button variant="contained" size="large">
            go to main page
          </Button>
        </CustomRouterLink>
      </div>
    );
  };

  return <div className={styles.page}>{matcher()}</div>;
};
