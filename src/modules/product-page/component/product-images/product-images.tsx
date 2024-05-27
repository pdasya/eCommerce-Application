import React, { FC } from 'react';
import { Image } from '@commercetools/platform-sdk';
import styles from './product-images.module.scss';

export const ProductImages: FC<Image> = (image: Image) => {
  const { url, label } = image;
  if (image) {
    return (
      <div
        className="f-carousel__slide"
        data-fancybox="gallery"
        data-src={url}
        data-thumb-src={url}>
        <img className={styles.image} src={url} alt={label || 'product-image'} />
      </div>
    );
  }
  return (
    <a data-fancybox="gallery" href="./public/assets/images/no-image.jpg">
      <img className={styles.image} src="./public/assets/images/no-image.jpg" alt="noImage" />
    </a>
  );
};
