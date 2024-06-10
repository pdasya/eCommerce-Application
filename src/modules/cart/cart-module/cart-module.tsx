import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useEffect, useState } from 'react';
// import { client } from '@config/constants';
// import { CartUpdateAction } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import {
  fetchCart,
  getTotalPrice,
  handleCartClear,
  handleDelete,
  handlePromoCodeApply,
  handleQuantityChange,
} from '../cart-module-api/cart-module-api';
import styles from './cart-module.module.scss';
import { CartHeader } from '../components/cart-header/cart-header';
import { CartItemList } from '../components/cart-item-list/cart-item-list';
import { PromoCodeForm } from '../components/cart-promocode-form/cart-promocode-form';
import { CartActions } from '../components/cart-actions/cart-actions';

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  oldPrice?: number;
  quantity: number;
}

const VALID_PROMO_CODES = ['promo20', 'test'];

export const CartModule: FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const items = await fetchCart();
      setCartItems(items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const itemName = await handleDelete(id);
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      toast.success(`Item ${itemName} is successfully deleted from the cart`);
    } catch (error) {
      toast.error(`Error deleting item`);
    }
  };

  const handleQuantityChangeItem = async (id: string, newQuantity: number) => {
    try {
      const itemName = await handleQuantityChange(id, newQuantity);
      toast.success(`Item ${itemName} quantity successfully changed`);
    } catch (error) {
      console.error(`Error updating quantity: ${error}`);
    }
  };

  const handleAdd = async (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + 1;
          handleQuantityChangeItem(id, newQuantity);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const handleRemove = async (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id && item.quantity > 1) {
          const newQuantity = item.quantity - 1;
          handleQuantityChangeItem(id, newQuantity);
          return { ...item, quantity: newQuantity };
        }
        if (item.quantity === 1 && item.id === id) {
          handleDeleteItem(id);
        }
        return item;
      }),
    );
  };

  const handleCartClearItems = async () => {
    try {
      await handleCartClear(cartItems);
      setCartItems([]);
      toast.success('Cart has been cleared');
    } catch (error) {
      toast.error('Error clearing cart');
    }
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPromoCode(value);

    if (!VALID_PROMO_CODES.includes(value)) {
      setPromoError('Invalid promo code');
    } else {
      setPromoError('');
    }
  };

  const handlePromoCodeApplyItems = async () => {
    try {
      const items = await handlePromoCodeApply(promoCode, VALID_PROMO_CODES);
      setCartItems(items);
      toast.success(`Promocode ${promoCode} is successfully applied`);
      setPromoCode('');
    } catch (error) {
      setPromoError('Invalid promo code');
      toast.error(`Error applying promo code: ${error.message}`);
    }
  };

  const fetchTotalPrice = async () => {
    try {
      const response = await getTotalPrice();
      const price = response ? response.centAmount : 0;
      setTotalPrice(price);
    } catch (error) {
      console.error(`Failed to get total price: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchTotalPrice();
  }, [cartItems]);

  return (
    <Grid container spacing={2} className={styles.cartModuleWrapper}>
      <CartHeader />
      <Grid item xs={12}>
        <Box className={styles.cartModuleContent}>
          {loading ? (
            <Typography variant="body1" gutterBottom>
              Loading...
            </Typography>
          ) : cartItems.length === 0 ? (
            <Typography variant="body1" gutterBottom>
              Your cart is empty
            </Typography>
          ) : (
            <>
              <CartItemList
                cartItems={cartItems}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
                handleDelete={handleDeleteItem}
              />
              <Box textAlign="right" marginTop={2}>
                <Typography variant="h6">
                  Total Price: ${totalPrice ? (totalPrice / 100).toFixed(2) : '0.00'}
                </Typography>
              </Box>
              <PromoCodeForm
                promoCode={promoCode}
                promoError={promoError}
                handlePromoCodeChange={handlePromoCodeChange}
                handlePromoCodeApply={handlePromoCodeApplyItems}
              />
              <CartActions handleCartClear={handleCartClearItems} />
            </>
          )}
          {cartItems.length === 0 && (
            <Button variant="contained" color="info" onClick={fetchCartItems}>
              Add Cart Items
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
