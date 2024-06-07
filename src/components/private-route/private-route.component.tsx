import React, { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { selectAuthorization } from '@store/auth/auth.slice';
import { selectAuthPending } from '@store/misc/misc.slice';
import { FullSizeLoading } from '@components/fullsize-loading/full-size-loading.component';
import { useAppSelector } from '@/hooks/use-app-selector.hook';

type PrivateRouteProps = PropsWithChildren<{
  redirectTo: `/${string}`;
  redirectIf: 'always' | 'authorized' | 'unauthorized';
}>;

export const PrivateRoute: FC<PrivateRouteProps> = ({ redirectTo, redirectIf, children }) => {
  const isAuthorized = useAppSelector(selectAuthorization);
  const isAuthInProgress = useAppSelector(selectAuthPending);

  return (
    <>
      {(() => {
        if (redirectIf === 'always') {
          return <Navigate to={redirectTo} replace />;
        }

        if (!isAuthInProgress) {
          switch (redirectIf) {
            case 'authorized':
              return isAuthorized ? <Navigate to={redirectTo} replace /> : children;
            case 'unauthorized':
              return !isAuthorized ? <Navigate to={redirectTo} replace /> : children;
            default:
              return children;
          }
        } else {
          return <FullSizeLoading isLoading />;
        }
      })()}
    </>
  );
};
