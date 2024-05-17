import React, { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { authorize, unauthorize } from '@store/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch.hook';
import styles from './main.page.module.scss';
import { tokenStorage } from '@/config/constants';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      throw new Error('Some error description');
    }
  });

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
