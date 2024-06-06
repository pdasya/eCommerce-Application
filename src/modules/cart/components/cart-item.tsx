import React from 'react';
import { CardMedia, Typography, IconButton, Box, CardContent, Card } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import styles from './cart-item.module.scss';

interface CartItemProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onDelete: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imageUrl,
  price,
  quantity,
  onAdd,
  onRemove,
  onDelete,
}) => {
  const totalPrice = price * quantity;

  return (
    <Card className={styles.cartItem}>
      <CardMedia component="img" className={styles.cartItemMedia} image={imageUrl} alt={name} />
      <CardContent className={styles.cartItemContent}>
        <Typography component="h5" variant="h6" className={styles.cartItemName}>
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Price: ${price.toFixed(2)}
        </Typography>
      </CardContent>
      <Box className={styles.cartItemBox}>
        <Typography variant="body2" className={styles.cartItemQuantityMargin}>
          Quantity
        </Typography>
        <Box className={styles.cartItemBoxQuantity}>
          <IconButton onClick={() => onRemove(id)}>
            <Remove />
          </IconButton>
          <Typography className={styles.cartItemBoxQuantityText}>{quantity}</Typography>
          <IconButton onClick={() => onAdd(id)}>
            <Add />
          </IconButton>
        </Box>
      </Box>
      <CardContent className={styles.cartItemTotalPrice}>
        <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
        <IconButton onClick={() => onDelete(id)} color="error">
          <Delete className={styles.deleteButton} />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CartItem;
