import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { ProductList } from '@modules/product-list';
import { selectSort, update } from '@store/catalog/catalog.slice';
import { toast } from 'react-toastify';
import { loadEnd, loading } from '@store/misc/misc.slice';
import { ProductSort } from '@modules/product-list/components/product-sorting/product-sorting.component';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { getProductsList } from '@/API/products/products-adapter';
import styles from './catalog.page.module.scss';

export const CatalogPage: FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSort);

  useEffect(() => {
    dispatch(loading({}));
    getProductsList(sortBy)
      .then(productsList => {
        dispatch(update(productsList));
      })
      .catch(error => toast.error(error))
      .finally(() => {
        dispatch(loadEnd({}));
      });
  }, [sortBy]);

  return (
    <div className={styles.page}>
      <ProductSort />
      <ProductList />
    </div>
  );
};
