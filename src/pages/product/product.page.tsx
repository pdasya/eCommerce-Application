import React, { FC } from 'react';
import { Product } from '@modules/product-page/product-page-module/product-page.module';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { loadEnd, loading } from '@store/misc/misc.slice';
import { clear, select } from '@store/product/product.slice';
import { useLocation } from 'react-router-dom';
import { useMountEffect } from '@hooks/use-mount-effect.hook';
import { getProduct } from '@/API/product/product-adapter';
// import styles from './product.page.module.scss';

export const ProductPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation().pathname.split('/');
  const slug = location[location.length - 1];
  useMountEffect(() => {
    dispatch(loading({}));
  });
  getProduct(slug)
    .then(product => {
      dispatch(select(product));
    })
    .catch(() => dispatch(clear()))
    .finally(() => dispatch(loadEnd({})));
  return <Product />;
};
