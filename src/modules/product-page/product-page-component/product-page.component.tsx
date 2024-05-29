import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Grid } from '@mui/material';
import classNames from 'classnames';
import { ISingleProduct } from '@/interfaces/interfaces';
import { AttributeList } from '../component/product-attribute-list/product-attribute-list';
import { ProductCollapse } from '../component/product-collapse/product-collapse';
import styles from './product-page.component.module.scss';
import { Gallery } from '../component/product-gallery/product-gallery.component';

export const ProductItem: FC<ISingleProduct> = ({
  title,
  description,
  images,
  currentPrice,
  currency,
  attributes,
  discountPrice,
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <Gallery images={images} />
    </Grid>
    <Grid item xs={12} md={6}>
      <Grid className={styles.item} sx={{ p: 2 }}>
        <Typography variant="h4" className={styles.title}>
          {title}
        </Typography>
        <div>
          {attributes.map(attribute => (
            <AttributeList {...attribute} key={attribute.name} />
          ))}
        </div>
        <div className={styles.priceContainer}>
          <p className={classNames(styles.price, discountPrice ? styles.priceInactive : '')}>
            {currentPrice}
            {currency}
          </p>
          {discountPrice ? (
            <p className={styles.priceDiscount}>
              {discountPrice}
              {currency}
            </p>
          ) : (
            ''
          )}
        </div>
        <Button className={styles.button} variant="contained">
          Add to cart
          <ShoppingCartIcon />
        </Button>
      </Grid>
      <Grid item className={styles.list}>
        {description ? <ProductCollapse {...{ name: 'description', value: description }} /> : ''}
        {attributes.map(attribute => (
          <ProductCollapse {...attribute} key={attribute.name} />
        ))}
      </Grid>
    </Grid>
  </Grid>
);
