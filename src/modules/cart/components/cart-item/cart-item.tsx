import React from 'react';
import { CardMedia, Typography, IconButton, Box, CardContent, Card } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import * as styles from './cart-item.module.scss';

interface CartItemProps {
  name: string;
  imageUrl: string;
  initialPrice: number;
  finalPrice: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  imageUrl,
  initialPrice,
  finalPrice,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const totalPrice = finalPrice * quantity;

  return (
    <Card className={styles.cartItem}>
      <CardMedia component="img" className={styles.cartItemMedia} image={imageUrl} alt={name} />
      <CardContent className={styles.cartItemContent}>
        <Typography component="h5" variant="h6" className={styles.cartItemName}>
          {name}
        </Typography>
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
          <IconButton onClick={() => onDecrement()}>
            <Remove />
          </IconButton>
          <Typography className={styles.cartItemBoxQuantityText}>{quantity}</Typography>
          <IconButton onClick={() => onIncrement()}>
            <Add />
          </IconButton>
        </Box>
      </Box>
      <CardContent className={styles.cartItemTotalPrice}>
        <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
        <IconButton onClick={() => onRemove()} color="error" className={styles.deleteButton}>
          <Delete />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CartItem;
