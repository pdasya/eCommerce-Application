import React, { useState } from 'react';
import { CardMedia, Typography, IconButton, Box, CardContent, Card } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { CustomRouterLink } from '@components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@routes/index';
import { generatePath } from 'react-router-dom';
import { FullSizeLoading } from '@components/fullsize-loading/full-size-loading.component';
import { cartService } from '@modules/cart/services/cart.service';
import { toast } from 'react-toastify';
import * as styles from './cart-item.module.scss';

interface CartItemProps {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  initialPrice: number;
  finalPrice: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  slug,
  imageUrl,
  initialPrice,
  finalPrice,
  quantity,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = finalPrice * quantity;

  const removeHandler = async () => {
    setIsLoading(true);
    try {
      await cartService.removeCartItem({ id });
      toast.success(`Item ${name} is successfully deleted from the cart`);
    } catch (error) {
      toast.error(`Error deleting item`);
    } finally {
      setIsLoading(false);
    }
  };

  const incrementHandler = async () => {
    setIsLoading(true);
    try {
      await cartService.updateCartItemQuantity([{ id, quantity: quantity + 1 }]);
    } catch (error) {
      toast.error(`Error updating quantity: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const decrementHandler = async () => {
    setIsLoading(true);
    try {
      await cartService.updateCartItemQuantity([{ id, quantity: quantity - 1 }]);
    } catch (error) {
      toast.error(`Error updating quantity: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={styles.cartItem}>
      <FullSizeLoading isLoading={isLoading} />
      <CardMedia component="img" className={styles.cartItemMedia} image={imageUrl} alt={name} />
      <CardContent className={styles.cartItemContent}>
        <CustomRouterLink
          to={generatePath(RoutePath.product, { id: slug })}
          className={styles.cartItemLink}>
          <Typography component="h5" variant="h6" className={styles.cartItemName}>
            {name}
          </Typography>
        </CustomRouterLink>
        {initialPrice !== finalPrice ? (
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ textDecoration: 'line-through' }}>
            ${initialPrice.toFixed(2)}
          </Typography>
        ) : null}
        <Typography variant="body1" color="text" className={styles.discountedPrice}>
          ${finalPrice.toFixed(2)}
        </Typography>
      </CardContent>
      <Box className={styles.cartItemBox}>
        <Typography variant="body2" className={styles.cartItemQuantityMargin}>
          Quantity
        </Typography>
        <Box className={styles.cartItemBoxQuantity}>
          <IconButton onClick={decrementHandler}>
            <Remove />
          </IconButton>
          <Typography className={styles.cartItemBoxQuantityText}>{quantity}</Typography>
          <IconButton onClick={incrementHandler}>
            <Add />
          </IconButton>
        </Box>
      </Box>
      <CardContent className={styles.cartItemTotalPrice}>
        <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
        <IconButton onClick={removeHandler} color="error" className={styles.deleteButton}>
          <Delete />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CartItem;
