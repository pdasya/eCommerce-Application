import React, { FC } from 'react';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { useMountEffect } from '@hooks/use-mount-effect.hook';
import { ProductList } from '@modules/product-list';
import { update } from '@store/catalog/catalog.slice';
import { toast } from 'react-toastify';
import { loadEnd, loading } from '@store/misc/misc.slice';
import { ProductSort } from '@modules/product-list/components/product-sorting/product-sorting.component';
import { getProductsList } from '@/API/products/products-adapter';
import styles from './catalog.page.module.scss';

export const CatalogPage: FC = () => {
  const dispatch = useAppDispatch();

  useMountEffect(() => {
    dispatch(loading({}));
    getProductsList()
      .then(productsList => {
        dispatch(update(productsList));
      })
      .catch(error => toast.error(error))
      .finally(() => {
        dispatch(loadEnd({}));
      });
  });

  return (
    <div className={styles.page}>
      <ProductSort />
      <ProductList />
    </div>
  );
};
