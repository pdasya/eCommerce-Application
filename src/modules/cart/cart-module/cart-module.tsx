import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CustomRouterLink } from '@components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@routes/index';
import CartItemComponent from '../components/cart-item';
import { getUserCart } from '../cart-module-api/cart-module-api';
import styles from './cart-module.module.scss';

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const LinkToCatalogPage: FC = () => (
  <CustomRouterLink to={RoutePath.catalog} className={styles.continueShoppingLink}>
    Continue Shopping
  </CustomRouterLink>
);

export const CartModule: FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleAdd = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  };

  const handleRemove = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Grid container spacing={2} className={styles.cartModuleWrapper}>
      <Grid item xs={12} className={styles.cartModuleHeaderWrapper}>
        <Box textAlign="center" className={styles.cartHeader}>
          <Typography variant="h4" component="h2" gutterBottom>
            Your cart
          </Typography>
          <ShoppingCartIcon fontSize="large" className={styles.cartImage} />
        </Box>
        <Box textAlign="center" className={styles.cartContinueHeader}>
          <LinkToCatalogPage />
          <ArrowForwardIosIcon fontSize="small" />
        </Box>
      </Grid>
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
            cartItems.map(item => (
              <CartItemComponent
                key={item.id}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                quantity={item.quantity}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onDelete={handleDelete}
              />
            ))
          )}
          <Button variant="contained" color="info" onClick={fetchCart}>
            Refresh Cart Items
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CartModule;
