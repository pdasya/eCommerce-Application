import React, { FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Http404Page } from '@pages/http-404/http-404.page';
import { ErrorPage } from '@pages/error/error.page';
import styles from './error-boundary.component.module.scss';

export const ErrorBoundary: FC = () => {
  const error = useRouteError();

  const matcher = () => {
    if (isRouteErrorResponse(error) && error.status === 404) {
      return <Http404Page />;
    }

    return <ErrorPage />;
  };

  return <div className={styles.root}>{matcher()}</div>;
};
