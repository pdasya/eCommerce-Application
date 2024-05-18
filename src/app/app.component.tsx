import React, { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { authorize, unauthorize } from '@modules/auth/auth.slice';
import { tokenName, tokenStorage } from '@config/constants';
import { Header } from '@/modules/header';
import { Footer } from '@/modules/footer';
import 'react-toastify/dist/ReactToastify.css';
import { client } from '../config/constants';
import styles from './app.component.module.scss';

const App = (): ReactElement => {
  const dispatch = useAppDispatch();

  const getToken = () => tokenStorage.get(tokenName) || false;
  const isToken = getToken();

  const init = () => {
    if (isToken) {
      dispatch(authorize({}));
      client.refreshToken(isToken.refreshToken);
    } else {
      dispatch(unauthorize({}));
      client.getClient();
    }
  };

  init();

  return (
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
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default App;
