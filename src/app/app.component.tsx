import React, { ReactElement, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { tokenName, saveStorage } from '@config/constants';
import { authorize } from '@store/auth/auth.slice';
import { GlobalLoading } from '@components/global-loading/global-loading.component';
import { authEnd } from '@store/misc/misc.slice';
import 'react-toastify/dist/ReactToastify.css';
import { client } from '../config/constants';
import styles from './app.component.module.scss';
import { Header } from '@/modules/header';
import { Footer } from '@/modules/footer';

const App = (): ReactElement => {
  const dispatch = useAppDispatch();

  const getToken = () => saveStorage.get(tokenName) || false;
  const isToken = getToken();

  const init = () => {
    if (isToken) {
      useEffect(() => {
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
          .then(() => dispatch(authEnd(false)))
          .catch(error => toast.error(error));
      }, []);
    } else {
      dispatch(authEnd(false));
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
