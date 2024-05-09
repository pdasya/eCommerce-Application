import { Button, InputLabel } from '@mui/material';
import React, { FC } from 'react';
import styles from './dummy-counter.component.module.scss';
import { useAppSelector } from '@/hooks/use-app-selector.hook';
import { decrement, increment, selectCount } from './dummy-counter.slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch.hook';

export const DummyCounter: FC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  console.log('render count component');

  const up = (): void => {
    dispatch(increment());
  };

  const down = (): void => {
    dispatch(decrement());
  };

  return (
    <div className={styles.counter}>
      <Button onClick={down}>-</Button>
      <InputLabel>{count}</InputLabel>
      <Button onClick={up}>+</Button>
    </div>
  );
};
