import React, { FC } from 'react';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DiscountIcon from '@mui/icons-material/Discount';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { selectedId } from '@store/product/product.slice';
import { IProduct } from '@/interfaces/interfaces';
import styles from './product-card.component.module.scss';

type ProductCardProps = IProduct;

export const ProductCard: FC<ProductCardProps> = ({
  id,
  imageSrc,
  imageAlt,
  title,
  description,
  currentPrice,
  currency,
  discountPrice,
  slug,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Link className={styles.root} to={slug} onClick={() => dispatch(selectedId(id))}>
      <div className={styles.wrap}>
        {discountPrice ? <DiscountIcon className={styles.iconDiscount} /> : ''}
        <div className={styles.imageContainer}>
          <img className={styles.image} src={imageSrc} alt={imageAlt} />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.bottomContainer}>
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
      </div>
    </Link>
  );
};
