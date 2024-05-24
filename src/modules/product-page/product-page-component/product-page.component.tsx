import React, { FC } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { ISingleProduct } from '@/interfaces/interfaces';

export const ProductItem: FC<ISingleProduct> = ({
  title,
  description,
  images,
  currentPrice,
  currency,
  discountPrice,
  attributes,
}) => {
  console.log(title, description, images, currentPrice, currency, discountPrice, attributes);
  return (
    <Grid container>
      <div />
    </Grid>
  );
};
