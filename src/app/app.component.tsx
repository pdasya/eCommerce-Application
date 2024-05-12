import React, { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/modules/header';
import styles from './app.component.module.scss';

const App = (): ReactElement => (
  <div className={styles.app}>
    <Header />
    <section className={styles.mainContent}>
      <Outlet />
    </section>
  </div>
);

export default App;
