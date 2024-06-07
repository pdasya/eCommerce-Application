import React, { FC } from 'react';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectIsCatalogUpdating, selectProducts } from '@store/catalog/catalog.slice';
import { ProductCard } from '../product-card/product-card.component';
import { NotFoundBanner } from '../not-found-banner/not-found-banner.component';
import { LoadingBanner } from '../loading-banner/loading-banner.component';
import styles from './product-list.component.module.scss';

export const ProductList: FC = () => {
  const products = useAppSelector(selectProducts);
  const isUpdating = useAppSelector(selectIsCatalogUpdating);

  return (
    <div className={styles.root}>
      {isUpdating ? (
        <LoadingBanner />
      ) : products.length ? (
        products.map(product => <ProductCard {...product} key={product.id} />)
      ) : (
        <NotFoundBanner />
      )}
    </div>
  );
};
