import React, { FC } from 'react';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectProducts } from '@store/catalog/catalog.slice';
import { selectLoading } from '@store/misc/misc.slice';
import { Paper } from '@mui/material';
import styles from './product-list.component.module.scss';
import { ProductCard } from '../product-card/product-card.component';
import { NotFoundBanner } from '../not-found-banner/not-found-banner.component';
import { LoadingBanner } from '../loading-banner/loading-banner.component';
import { ProductSort } from '../product-sorting/product-sorting.component';

export const ProductList: FC = () => {
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectLoading);

  return (
    <>
      <Paper className={styles.panel}>
        <ProductSort />
      </Paper>
      <div className={styles.root}>
        {products.length ? (
          products.map(product => <ProductCard {...product} key={product.id} />)
        ) : isLoading ? (
          <LoadingBanner />
        ) : (
          <NotFoundBanner />
        )}
      </div>
    </>
  );
};
