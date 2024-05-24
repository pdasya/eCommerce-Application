import React, { FC } from 'react';
import { Product } from '@modules/product-page/product-page-module/product-page.module';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { useMountEffect } from '@hooks/use-mount-effect.hook';
import { loadEnd, loading } from '@store/misc/misc.slice';
import { toast } from 'react-toastify';
import { select, selectId } from '@store/product/product.slice';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { getProduct } from '@/API/product/product-adapter';
// import styles from './product.page.module.scss';

export const ProductPage: FC = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectId);

  useMountEffect(() => {
    dispatch(loading({}));
    getProduct(id)
      .then(product => {
        dispatch(select(product));
      })
      .catch(error => toast.error(error))
      .finally(() => {
        dispatch(loadEnd({}));
      });
  });
  return <Product />;
};
