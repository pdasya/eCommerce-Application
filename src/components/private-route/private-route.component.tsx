import React, { FC, Fragment, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { selectAuthorization } from '@store/auth/auth.slice';
import { useAppSelector } from '@/hooks/use-app-selector.hook';

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
