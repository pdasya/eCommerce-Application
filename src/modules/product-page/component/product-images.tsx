import React, { FC } from 'react';
import { Image } from '@commercetools/platform-sdk';

export const ProductImage: FC<Image> = (image: Image) => {
  const { url, label } = image;
  if (image) {
    return <img src={url} alt={label || 'product-image'} />;
  }
  return <img src="./public/assets/images/no-image.jpg" alt="noImage" />;
};
