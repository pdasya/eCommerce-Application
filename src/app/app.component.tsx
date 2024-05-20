import React, { ReactElement } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { tokenName, tokenStorage } from '@config/constants';
import { authorize } from '@store/auth/auth.slice';
import { GlobalLoading } from '@components/global-loading/global-loading.component';
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
      client.refreshToken(isToken.refreshToken);
      client
        .getClient()
        .me()
        .get()
        .execute()
        .then(response =>
          dispatch(
            authorize({
              id: response.body.id,
              email: response.body.email,
            }),
          ),
        )
        .catch(error => toast.error(error));
    }
  };

  init();

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
