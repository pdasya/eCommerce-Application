import React, { ReactElement, useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';
import { apiRoot } from '../commercetools/client';
import { lineBreaker } from '../constants/constants';
import styles from './app.component.module.css';
import { DummyCart } from '../my-components/molecules/test-cart/test-cart.component';

const App = (): ReactElement => {
  const [productsList, setProductsList] = useState<Product[]>([]);

  const getProductsList = async (): Promise<void> => {
    try {
      const response = await apiRoot.products().get().execute();
      const products = response.body.results;
      setProductsList(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return (
    <div className={styles.app}>
      <DummyCart />
      {productsList.map(product => (
        <pre className={styles.item} key={product.id}>
          {JSON.stringify(product, undefined, lineBreaker)}
        </pre>
      ))}
    </div>
  );
};

export default App;
