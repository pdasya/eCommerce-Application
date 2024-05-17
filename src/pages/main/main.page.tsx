import React, { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/hooks/use-app-dispatch.hook';
import { authorize, unauthorize } from '@/modules/auth/auth.slice';
import styles from './main.page.module.scss';
import { client, tokenStorage } from '@/config/constants';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      throw new Error('Some error description');
    }
  });

  const isAuth = () => {
    const token = tokenStorage.get('token');
    if (token) {
      console.log('LOGIN');
      dispatch(authorize({}));
      client.refreshToken(token.refreshToken).customers().get().execute();
    } else {
      console.log('NOT LOGIN');
      client.anonymousSession().products().get().execute();
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div className={styles.page}>
      <ul>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            tokenStorage.set('token', {
              token: 'token',
              expirationTime: 0,
              refreshToken: 'refresh token',
            });
            dispatch(authorize({ id: 1 }));
          }}>
          fake sign in
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            tokenStorage.clear();
            dispatch(unauthorize({}));
          }}>
          fake sign out
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            setIsError(true);
          }}>
          throw error
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            toast.error('Some error message');
          }}>
          toastify
        </Button>
      </ul>
    </div>
  );
};
