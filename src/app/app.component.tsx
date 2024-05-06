import React, { ReactElement, useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';
import { apiRoot } from '../commercetools/client';
import { lineBreaker } from '../constants/constants';

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
    <div>
      {productsList.map(product => (
        <pre key={product.id}>{JSON.stringify(product, undefined, lineBreaker)}</pre>
      ))}
    </div>
  );
};

export default App;
