import React, { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DiscountIcon from '@mui/icons-material/Discount';
import classNames from 'classnames';
import { generatePath, Link } from 'react-router-dom';
import { RoutePath } from '@routes/index';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectCart } from '@store/cart/cart.slice';
import { cartService } from '@modules/cart';
import { toast } from 'react-toastify';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { CustomRouterLink } from '@components/custom-router-link/custom-router-link.component';
import { FullSizeLoading } from '@components/fullsize-loading/full-size-loading.component';
import * as styles from './product-card.component.module.scss';
import { IProduct } from '@/interfaces/interfaces';

type ProductCardProps = IProduct;

export const ProductCard: FC<ProductCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  currentPrice,
  currency,
  discountPrice,
  slug,
  sku,
}) => {
  const cart = useAppSelector(selectCart);
  const [isInCart, setIsInCart] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const cartItem = cart.items.find(item => item.sku === sku);
    setIsInCart(!!cartItem);
  }, [cart]);

  const addToCartClickHandler = async (itemSku: string) => {
    setIsPending(true);

    try {
      await cartService.addCartItem([{ sku: itemSku }]);
      toast.success(`Item added to cart`);
    } catch (error) {
      toast.error(`Add to cart failed. ${error.message}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={styles.root}>
      <FullSizeLoading isLoading={isPending} />
      <CustomRouterLink to={generatePath(RoutePath.product, { id: slug })}>
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
            {isInCart ? (
              <object className={styles.button}>
                <Link to={RoutePath.cart}>
                  <Button className={styles.button} variant="contained" color="success">
                    Go to cart
                    <ShoppingCartCheckoutIcon />
                  </Button>
                </Link>
              </object>
            ) : (
              <Button
                className={styles.button}
                variant="contained"
                onClick={event => {
                  event.preventDefault();
                  addToCartClickHandler(sku);
                }}>
                Add to cart
                <ShoppingCartIcon />
              </Button>
            )}
          </div>
        </div>
      </CustomRouterLink>
    </div>
  );
};
