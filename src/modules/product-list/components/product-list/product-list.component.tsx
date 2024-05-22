import React, { FC } from 'react';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectProducts } from '@store/catalog/catalog.slice';
import styles from './product-list.component.module.scss';
import { ProductCard } from '../product-card/product-card.component';

export const ProductList: FC = () => {
  const products = useAppSelector(selectProducts);

  return (
    <div className={styles.root}>
      {products.map(product => (
        <ProductCard {...product} />
      ))}

      {/* <ProductCard imageSrc="https://loremflickr.com/640/480" />
      <ProductCard imageSrc="https://loremflickr.com/640/480" />
      <ProductCard imageSrc="https://loremflickr.com/640/480" />
      <ProductCard imageSrc="https://loremflickr.com/640/480" />
      <ProductCard imageSrc="https://loremflickr.com/640/480" /> */}
    </div>
  );
};
