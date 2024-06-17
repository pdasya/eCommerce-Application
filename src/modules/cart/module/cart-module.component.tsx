import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { selectCart } from '@store/cart/cart.slice';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { cartService } from '@modules/cart/services/cart.service';
import { selectAuthorization } from '@store/auth/auth.slice';
import { CartHeader } from '../components/cart-header/cart-header';
import { CartItemList } from '../components/cart-item-list/cart-item-list';
import { PromoCodeForm } from '../components/cart-promocode-form/cart-promocode-form';
import { CartActions } from '../components/cart-actions/cart-actions';
import { ICartItem } from '../interfaces/cart-item.interface';
import * as styles from './cart-module.component.module.scss';

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

  useEffect(() => {
    getPromoName();
  }, [promoCodeState]);

  useEffect(() => {
    setLoading(true);
    cartService
      .synchronize()
      .catch(error => toast.error(error))
      .finally(() => setLoading(false));
  }, [isAuthorized]);

  const addMockItems = async () => {
    setLoading(true);

    const items = [
      {
        sku: 'yamato-sauces-3_1',
        quantity: 1,
      },
      {
        sku: 'itoen-tea-1_1',
        quantity: 1,
      },
      {
        sku: 'itoen-tea-4_1',
        quantity: 1,
      },
      {
        sku: 'itoen-tea-3_1',
        quantity: 1,
      },
    ];

    try {
      await cartService.addCartItem(items);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const promoCodeRemover = async () => {
    if (promoCode) {
      await cartService.removePromoCode(promoCodeId);
    }
    setPromoCode('');
    setPromoCodeState(false);
  };

  const removeItemHandler = async (item: ICartItem) => {
    try {
      await cartService.removeCartItem(item);
      toast.success(`Item ${item.name} is successfully deleted from the cart`);
    } catch (error) {
      toast.error(`Error deleting item`);
    }
  };

  const incrementItemHandler = async (item: ICartItem) => {
    try {
      cartService.updateCartItemQuantity([{ ...item, quantity: item.quantity + 1 }]);
      toast.success(`Item ${item.name} quantity successfully changed`);
    } catch (error) {
      toast.error(`Error updating quantity: ${error}`);
    }
  };

  const decrementItemHandler = async (item: ICartItem) => {
    try {
      cartService.updateCartItemQuantity([{ ...item, quantity: item.quantity + -1 }]);
      toast.success(`Item ${item.name} quantity successfully changed`);
    } catch (error) {
      toast.error(`Error updating quantity: ${error}`);
    }
  };

  const handleCartClearItems = async () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      setLoading(true);
      try {
        await promoCodeRemover();
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
      await promoCodeRemover();
      toast.success(`Promo code "${promoCode}" is successfully deleted`);
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
              <CartItemList
                cartItems={cart.items}
                onIncrement={incrementItemHandler}
                onDecrement={decrementItemHandler}
                onRemove={removeItemHandler}
              />
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
          {cart.items.length === 0 && (
            <Button variant="contained" color="info" onClick={addMockItems}>
              Add Cart Items
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
