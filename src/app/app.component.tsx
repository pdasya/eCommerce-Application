import React, { ReactElement, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import {
  selectCategory,
  setCustomFilterOptions,
  setPriceFilter,
  setPriceLimits,
} from '@store/catalog/catalog.slice';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { tokenName, saveStorage } from '@config/constants';
import { authorize } from '@store/auth/auth.slice';
import { GlobalLoading } from '@components/global-loading/global-loading.component';
import { authEnd } from '@store/misc/misc.slice';
import 'react-toastify/dist/ReactToastify.css';
import { allowedAttributesNames } from '@config/allowed-filter-attributes';
import { client } from '../config/constants';
import styles from './app.component.module.scss';
import { getFilterOptions } from '@/API/filtering/get-filter-options';
import { getPriceRange } from '@/API/filtering/get-price-range';
import { Header } from '@/modules/header';
import { Footer } from '@/modules/footer';

const App = (): ReactElement => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);

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

  useEffect(() => {
    getFilterOptions()
      .then(attributes => {
        Object.keys(attributes).forEach(name => {
          if (!allowedAttributesNames.includes(name)) {
            delete attributes[name];
          }
        });
        dispatch(setCustomFilterOptions(attributes));
      })
      .catch(error => toast.error(error));

    getPriceRange()
      .then(({ min, max }) => {
        const roundedLimits = {
          min: Math.floor(min),
          max: Math.ceil(max),
        };
        dispatch(setPriceLimits(roundedLimits));
        dispatch(setPriceFilter(roundedLimits));
      })
      .catch(error => toast.error(error));
  }, [category]);

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
