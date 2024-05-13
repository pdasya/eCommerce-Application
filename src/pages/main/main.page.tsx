import React, { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useAppDispatch } from '@/hooks/use-app-dispatch.hook';
import { authorize, unauthorize } from '@/modules/auth/auth.slice';
import styles from './main.page.module.scss';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      throw new Error('Some error description');
    }
  });

  return (
    <div>
      <ul className={styles.page}>
        <Button variant="contained" color="success" onClick={() => dispatch(authorize({ id: 1 }))}>
          fake sign in
        </Button>
        <Button variant="contained" color="secondary" onClick={() => dispatch(unauthorize({}))}>
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
      </ul>
    </div>
  );
};
