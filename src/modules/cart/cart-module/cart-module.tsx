import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useState } from 'react';
import { client } from '@config/constants';
import { CartUpdateAction } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import { getUserCart } from '../cart-module-api/cart-module-api';
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

const VALID_PROMO_CODES = ['promo20'];

export const CartModule: FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const fetchCart = async () => {
    setLoading(true);
    try {
      const cart = await getUserCart();
      const items = cart.lineItems.map(item => ({
        id: item.id,
        name: item.name.en,
        imageUrl: 'https://via.placeholder.com/150',
        price: item.price.value.centAmount / 100,
        quantity: item.quantity,
      }));
      setCartItems(items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const updateActionDelete = [
      {
        action: 'removeLineItem',
        lineItemId: id,
      },
    ];

    try {
      const response = await client.getClient().me().activeCart().get().execute();
      const cartVersion = response.body.version;
      const currentCartId = response.body.id;

      const itemName =
        response.body.lineItems.find((item: { id: string }) => item.id === id)?.name?.en || 'Item';

      await client
        .getClient()
        .carts()
        .withId({ ID: currentCartId })
        .post({
          body: {
            version: cartVersion,
            actions: updateActionDelete as CartUpdateAction[],
          },
        })
        .execute();

      setCartItems(prevItems => prevItems.filter(item => item.id !== id));

      const cartResponse = await client.getClient().me().carts().get().execute();

      // Для проверки работы функционала добавления
      console.log(cartResponse.body.results);
      toast.success(`Item ${itemName} is successfully deleted from the cart`);
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error(`Error deleting item`);
    }
  };

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    const updateQuantityAction = [
      {
        action: 'changeLineItemQuantity',
        lineItemId: id,
        quantity: newQuantity,
      },
    ];

    try {
      const response = await client.getClient().me().activeCart().get().execute();
      const cartVersion = response.body.version;
      const currentCartId = response.body.id;

      const itemName =
        response.body.lineItems.find((item: { id: string }) => item.id === id)?.name?.en || 'Item';

      await client
        .getClient()
        .carts()
        .withId({ ID: currentCartId })
        .post({
          body: {
            version: cartVersion,
            actions: updateQuantityAction as CartUpdateAction[],
          },
        })
        .execute();
      toast.success(`Item ${itemName} quantity successfully changed`);

      // Для проверки работы функционала изменения количества
      const responseCheck = await client.getClient().me().activeCart().get().execute();
      console.log(responseCheck.body);
    } catch (error) {
      console.error(`Error updating quantity: ${error}`);
    }
  };

  const handleAdd = async (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + 1;
          handleQuantityChange(id, newQuantity);
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
          handleQuantityChange(id, newQuantity);
          return { ...item, quantity: newQuantity };
        }
        if (item.quantity === 1 && item.id === id) {
          handleDelete(id);
        }
        return item;
      }),
    );
  };

  const handleCartClear = async () => {
    const clearCartActions = cartItems.map(item => ({
      action: 'removeLineItem',
      lineItemId: item.id,
    }));

    try {
      const response = await client.getClient().me().activeCart().get().execute();
      const cartVersion = response.body.version;
      const currentCartId = response.body.id;

      await client
        .getClient()
        .carts()
        .withId({ ID: currentCartId })
        .post({
          body: {
            version: cartVersion,
            actions: clearCartActions as CartUpdateAction[],
          },
        })
        .execute();

      setCartItems([]);
      toast.success('Cart has been cleared');

      // Для проверки работы функционала удаления товаров из корзины
      const responseCheck = await client.getClient().me().activeCart().get().execute();
      console.log(responseCheck.body);
    } catch (error) {
      console.error('Error clearing cart:', error);
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

  const handlePromoCodeApply = async () => {
    if (!VALID_PROMO_CODES.includes(promoCode)) {
      setPromoError('Invalid promo code');
      return;
    }

    const updatePromoCodeActions = [
      {
        action: 'addDiscountCode',
        code: promoCode,
      },
    ];

    try {
      const response = await client.getClient().me().activeCart().get().execute();
      const cartVersion = response.body.version;
      const currentCartId = response.body.id;

      await client
        .getClient()
        .carts()
        .withId({ ID: currentCartId })
        .post({
          body: {
            version: cartVersion,
            actions: updatePromoCodeActions as CartUpdateAction[],
          },
        })
        .execute();

      const cartResponse = await client.getClient().me().carts().get().execute();

      const items = cartResponse.body.results[0].lineItems.map(item => {
        const discountedPrice = item.price.discounted?.value.centAmount;
        const regularPrice = item.price.value.centAmount;

        return {
          id: item.id,
          name: item.name.en,
          imageUrl: 'https://via.placeholder.com/150',
          price: discountedPrice ? discountedPrice / 100 : regularPrice / 100,
          oldPrice: discountedPrice ? regularPrice / 100 : undefined,
          quantity: item.quantity,
        };
      });

      setCartItems(items);
      // Для проверки работы функционала работы промокода
      console.log(cartResponse.body.results);
      toast.success(`Promocode ${promoCode} is successfully applied`);
      setPromoCode('');
    } catch (error) {
      console.error('Error applying promocode:', error);
      toast.error(`Error applying promocode:`);
    }
  };

  // useEffect(() => {
  //   fetchCart();
  // }, []);

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
                handleDelete={handleDelete}
              />
              <Box textAlign="right" marginTop={2}>
                <Typography variant="h6">
                  Total Price: $
                  {cartItems
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    .toFixed(2)}
                </Typography>
              </Box>
              <PromoCodeForm
                promoCode={promoCode}
                promoError={promoError}
                handlePromoCodeChange={handlePromoCodeChange}
                handlePromoCodeApply={handlePromoCodeApply}
              />
              <CartActions handleCartClear={handleCartClear} />
            </>
          )}
          {cartItems.length === 0 && (
            <Button variant="contained" color="info" onClick={fetchCart}>
              Add Cart Items
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
