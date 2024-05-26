import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { ProductList } from '@modules/product-list';
import {
  selectCustomFilters,
  selectPriceFilter,
  selectSort,
  update,
} from '@store/catalog/catalog.slice';
import { toast } from 'react-toastify';
import { loadEnd, loading } from '@store/misc/misc.slice';
import { ProductSort } from '@modules/product-list/components/product-sorting/product-sorting.component';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { clear } from '@store/product/product.slice';
import { FilterPanel } from '@modules/filter-panel';
import { getProductsList } from '@/API/products/products-adapter';
import styles from './catalog.page.module.scss';

export const CatalogPage: FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSort);
  const priceFilter = useAppSelector(selectPriceFilter);
  const customFilters = useAppSelector(selectCustomFilters);

  useEffect(() => {
    dispatch(loading({}));
    getProductsList({
      sort: sortBy,
      filter: [
        `variants.price.centAmount:range (${priceFilter.min * 10} to ${priceFilter.max * 10})`,
        ...Object.entries(customFilters)
          .filter(entries => Object.values(entries[1]).some(value => value === true))
          .map(
            ([attribute, values]) =>
              `variants.attributes.${attribute}:${Object.entries(values)
                .filter(entries => entries[1] === true)
                .map(([key]) => `"${key}"`)
                .join(', ')}`,
          ),
      ],
    })
      .then(productsList => {
        dispatch(update(productsList));
        dispatch(clear());
      })
      .catch(error => toast.error(error))
      .finally(() => {
        dispatch(loadEnd({}));
      });
  }, [
    sortBy,
    priceFilter,
    customFilters,
  ]);

  return (
    <div className={styles.page}>
      <ProductSort />
      <div className={styles.main}>
        <FilterPanel className={styles.filterPanel} />
        <ProductList />
      </div>
    </div>
  );
};
