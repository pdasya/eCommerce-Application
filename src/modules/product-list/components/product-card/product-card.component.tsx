import React, { FC } from 'react';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DiscountIcon from '@mui/icons-material/Discount';
import classNames from 'classnames';
import { IProduct } from '@/interfaces/interfaces';
import styles from './product-card.component.module.scss';

type ProductCardProps = IProduct;

export const ProductCard: FC<ProductCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  currentPrice,
  currency,
  discountPrice,
}) => (
  <div className={styles.root}>
    {discountPrice ? <DiscountIcon className={styles.iconDiscount} /> : ''}
    <div className={styles.imageContainer}>
      <img className={styles.image} src={imageSrc} alt={imageAlt} />
    </div>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.description}>{description}</p>
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
  </div>
);
