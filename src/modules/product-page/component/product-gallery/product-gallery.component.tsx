import React, { FC } from 'react';
import { Image } from '@commercetools/platform-sdk';
import { ProductImages } from '../product-images/product-images';
import { Fancybox } from '../../../../components/fancybox/fancybox.component';
import { Carousel } from '../../../../components/fancybox/carousel.component';

type GalleryType = {
  images: Image[];
};

export const Gallery: FC<GalleryType> = ({ images }) => (
  <Fancybox>
    <Carousel options={{ infinite: false }}>
      {images.map(image => (
        <ProductImages {...image} key={image.url} />
      ))}
    </Carousel>
  </Fancybox>
);
