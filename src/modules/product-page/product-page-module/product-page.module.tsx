import React, { FC } from 'react';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectProduct } from '@store/product/product.slice';
import { ProductItem } from '../product-page-component/product-page.component';

export const Product: FC = () => {
  const product = useAppSelector(selectProduct);
  return (
    <div>
      <ProductItem {...product} key={product.id} />
    </div>
  );
};
