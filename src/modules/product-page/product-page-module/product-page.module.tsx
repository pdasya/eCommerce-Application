import React, { FC } from 'react';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectProduct } from '@store/product/product.slice';
import { selectLoading } from '@store/misc/misc.slice';
import CircularProgress from '@mui/material/CircularProgress';
import { ProductItem } from '../product-page-component/product-page.component';

export const Product: FC = () => {
  const product = useAppSelector(selectProduct);
  const isLoading = useAppSelector(selectLoading);
  return isLoading ? (
    <CircularProgress color="warning" />
  ) : (
    <ProductItem {...product} key={product.id} />
  );
};
