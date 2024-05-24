import React, { FC } from 'react';
import { Image } from '@commercetools/platform-sdk';
import styles from './product-images.module.scss';

export const ProductImage: FC<Image> = (image: Image) => {
  const { url, label } = image;
  if (image) {
    return <img className={styles.image} src={url} alt={label || 'product-image'} />;
  }
  return <img className={styles.image} src="./public/assets/images/no-image.jpg" alt="noImage" />;
};
