import React, { FC } from 'react';
import { Button } from '@mui/material';
import { useAppDispatch } from '@/hooks/use-app-dispatch.hook';
import { authorize, unauthorize } from '@/modules/auth/auth.slice';
import styles from './main.page.module.scss';
import { tokenStorage } from '@/config/constants';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <ul className={styles.page}>
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
      </ul>
    </div>
  );
};
