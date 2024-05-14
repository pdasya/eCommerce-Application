import React, { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { Header } from '@/modules/header';
import styles from './app.component.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = (): ReactElement => (
  <div className={styles.app}>
    <Header />
    <section className={styles.mainContent}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Outlet />
    </section>
  </div>
);

export default App;
