import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { selectCart } from '@store/cart/cart.slice';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { cartService } from '@modules/cart/services/cart.service';
import { selectAuthorization } from '@store/auth/auth.slice';
import { CustomRouterLink } from '@components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@routes/index';
import { CartHeader } from '../components/cart-header/cart-header';
import { CartItemList } from '../components/cart-item-list/cart-item-list';
import { PromoCodeForm } from '../components/cart-promocode-form/cart-promocode-form';
import { CartActions } from '../components/cart-actions/cart-actions';
import * as styles from './cart-module.component.module.scss';

const LinkToCatalogPage: FC = () => (
  <Button variant="contained" color="info">
    <CustomRouterLink to={RoutePath.catalogDefault} className={styles.continueShoppingButtonLink}>
      Continue Shopping
    </CustomRouterLink>
  </Button>
);

export const CartModule: FC = () => {
  const cart = useAppSelector(selectCart);
  const isAuthorized = useAppSelector(selectAuthorization);

  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeId, setPromoCodeId] = useState('');
  const [promoCodeState, setPromoCodeState] = useState(false);
  const [promoError, setPromoError] = useState('');

  const getPromoName = async () => {
    try {
      const results = await cartService.getPromoCodeInfo();
      if (results) {
        if (results.promoName) {
          setPromoCode(results.promoName);
          setPromoCodeId(results.ID);
          setPromoCodeState(true);
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  getPromoName();

  useEffect(() => {
    setLoading(true);
    cartService
      .synchronize()
      .catch(error => toast.error(error))
      .finally(() => setLoading(false));
  }, [isAuthorized]);

  const handleCartClearItems = async () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      setLoading(true);
      try {
        await cartService.deleteCart();
        toast.success('Cart has been cleared');
      } catch (error) {
        toast.error('Error clearing cart');
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPromoCode(value);
    setPromoError('');
  };

  const handlePromoCodeApplyItems = async () => {
    try {
      await cartService.applyPromoCode(promoCode);
      toast.success(`Promo code "${promoCode}" is successfully applied`);
      setPromoCodeState(true);
    } catch (error) {
      setPromoError('Invalid promo code');
      toast.warning(`Unable apply promo code: ${error.message}`);
    }
  };

  const handlePromoCodeDeleteItems = async () => {
    try {
      await cartService.removePromoCode(promoCodeId);
      toast.success(`Promo code "${promoCode}" is successfully deleted`);
      setPromoCode('');
      setPromoCodeState(false);
    } catch (error) {
      setPromoError('Invalid promo code');
      toast.warning(`Unable deleted promo code: ${error.message}`);
    }
  };

  const handlePromoCodePressEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && promoCode.length > 0) {
      handlePromoCodeApplyItems();
    }
  };

  return (
    <Grid container spacing={2} className={styles.cartModuleWrapper}>
      <CartHeader />
      <Grid item xs={12}>
        <Box className={styles.cartModuleContent}>
          {loading ? (
            <Typography variant="body1" gutterBottom>
              Loading...
            </Typography>
          ) : cart.items.length === 0 ? (
            <Typography variant="body1" gutterBottom>
              Your cart is empty
            </Typography>
          ) : (
            <>
              <CartItemList cartItems={cart.items} />
              <Box textAlign="right" marginTop={2}>
                {cart.initialPrice !== cart.finalPrice && (
                  <Typography variant="body2" style={{ textDecoration: 'line-through' }}>
                    ${cart.initialPrice.toFixed(2)}
                  </Typography>
                )}
                <Typography variant="h6">Total Price: ${cart.finalPrice.toFixed(2)}</Typography>
              </Box>
              <PromoCodeForm
                promoCode={promoCode}
                promoCodeState={promoCodeState}
                promoError={promoError}
                handlePromoCodeChange={handlePromoCodeChange}
                handlePromoCodePressEnter={handlePromoCodePressEnter}
                handlePromoCodeApply={handlePromoCodeApplyItems}
                handlePromoCodeDeleteItems={handlePromoCodeDeleteItems}
              />
              <CartActions handleCartClear={handleCartClearItems} />
            </>
          )}
          {cart.items.length === 0 && <LinkToCatalogPage />}
        </Box>
      </Grid>
    </Grid>
  );
};
