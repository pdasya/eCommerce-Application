import React, { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Grid } from '@mui/material';
import classNames from 'classnames';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectCart } from '@store/cart/cart.slice';
import { cartService } from '@modules/cart';
import { toast } from 'react-toastify';
import { FullSizeLoading } from '@components/fullsize-loading/full-size-loading.component';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { RoutePath } from '@routes/index';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CustomRouterLink } from '@components/custom-router-link/custom-router-link.component';
import * as styles from './product-page.component.module.scss';
import { Gallery } from '../component/product-gallery/product-gallery.component';
import { ProductCollapse } from '../component/product-collapse/product-collapse';
import { AttributeList } from '../component/product-attribute-list/product-attribute-list';
import { ISingleProduct } from '@/interfaces/interfaces';

export const ProductItem: FC<ISingleProduct> = ({
  title,
  description,
  images,
  currentPrice,
  currency,
  attributes,
  discountPrice,
  sku,
}) => {
  const cart = useAppSelector(selectCart);
  const [isInCart, setIsInCart] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [cartItemId, setCartItemId] = useState('');

  useEffect(() => {
    const cartItem = cart.items.find(item => item.sku === sku);
    setCartItemId(cartItem?.id || '');
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

  const removeFromCartClickHandler = async () => {
    setIsPending(true);

    try {
      await cartService.removeCartItem({ id: cartItemId });
      toast.success(`Item removed from cart`);
    } catch (error) {
      toast.error(`Remove item failed. ${error.message}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Gallery images={images} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid className={styles.item} sx={{ p: 2 }}>
          <FullSizeLoading isLoading={isPending} />
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
          {isInCart ? (
            <object className={styles.buttonWrapperObject}>
              <CustomRouterLink className={styles.buttonWrapperObject} to={RoutePath.cart}>
                <Button className={styles.button} variant="contained" color="success">
                  Go to cart
                  <ShoppingCartCheckoutIcon />
                </Button>
              </CustomRouterLink>
              <Button
                className={styles.button}
                variant="contained"
                color="error"
                onClick={removeFromCartClickHandler}>
                <DeleteOutlineIcon />
              </Button>
            </object>
          ) : (
            <Button
              className={styles.button}
              variant="contained"
              onClick={() => {
                addToCartClickHandler(sku);
              }}>
              Add to cart
              <ShoppingCartIcon />
            </Button>
          )}
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
};
