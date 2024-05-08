import React, { FC } from 'react';
import styles from './redux-test.page.module.scss';
import { DummyCounter } from '@/modules/dummy-module';

export const ReduxTestPage: FC = () => (
  <div className={styles.page}>
    Redux test page works!
    <DummyCounter />
  </div>
);
