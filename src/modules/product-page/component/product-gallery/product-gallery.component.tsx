import React, { FC } from 'react';
import { Image } from '@commercetools/platform-sdk';
import { ProductImages } from '../product-images/product-images';
import { Fancybox } from '../../../../components/fancybox/fancybox.component';
import { Carousel } from '../../../../components/fancybox/carousel.component';
import styles from './product-gallery.module.scss';

type GalleryType = {
  images: Image[];
};

export const Gallery: FC<GalleryType> = ({ images }) => (
  <Fancybox>
    <Carousel options={{ infinite: false }}>
      {images.length ? (
        images.map(image => <ProductImages {...image} key={image.url} />)
      ) : (
        <a data-fancybox="gallery" href="./assets/images/no-image.jpg">
          <img className={styles.image} src="./assets/images/no-image.jpg" alt="noImage" />
        </a>
      )}
    </Carousel>
  </Fancybox>
);
