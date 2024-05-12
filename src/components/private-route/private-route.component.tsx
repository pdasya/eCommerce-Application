import React, { FC, Fragment, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/use-app-selector.hook';
import { selectAuthorization } from '@/modules/auth/auth.slice';

type PrivateRouteProps = PropsWithChildren<{
  redirectTo: `/${string}`;
  redirectIf: 'always' | 'authorized' | 'unauthorized';
}>;

export const PrivateRoute: FC<PrivateRouteProps> = ({ redirectTo, redirectIf, children }) => {
  const isAuthorized = useAppSelector(selectAuthorization);

  return (
    <>
      {(() => {
        switch (redirectIf) {
          case 'always':
            return <Navigate to={redirectTo} replace />;
          case 'authorized':
            return isAuthorized ? <Navigate to={redirectTo} replace /> : children;
          case 'unauthorized':
            return !isAuthorized ? <Navigate to={redirectTo} replace /> : children;
          default:
            return children;
        }
      })()}
    </>
  );
};
