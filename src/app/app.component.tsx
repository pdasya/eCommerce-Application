import React, { ReactElement, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { GlobalLoading } from '@components/global-loading/global-loading.component';
import 'react-toastify/dist/ReactToastify.css';
import { cartService } from '@modules/cart';
import { Header } from '@/modules/header';
import { Footer } from '@/modules/footer';
import { authService } from '@/services/auth.service';
import * as styles from './app.component.module.scss';

const App = (): ReactElement => {
  useEffect(() => {
    (async () => {
      try {
        await authService.init();
        await cartService.synchronize();
      } catch (error) {
        toast.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.app}>
      <Header />

      <section className={styles.mainContent}>
        <GlobalLoading />
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
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default App;
