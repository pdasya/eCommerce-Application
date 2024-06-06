import React from 'react';
import { CardMedia, Typography, IconButton, Box } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline, Delete } from '@mui/icons-material';
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
    <Box className={styles.cartItem}>
      <CardMedia component="img" image={imageUrl} alt={name} />
      <Box className={styles.cartItemDetails}>
        <Typography component="h5" variant="h5">
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Price: ${price.toFixed(2)}
        </Typography>
        <Box className={styles.cartItemActions}>
          <Typography variant="body2" component="span">
            Quantity
          </Typography>
          <IconButton color="primary" onClick={() => onRemove(id)}>
            <RemoveCircleOutline />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton color="primary" onClick={() => onAdd(id)}>
            <AddCircleOutline />
          </IconButton>
          <Typography variant="h6" component="span">
            ${totalPrice.toFixed(2)}
          </Typography>
          <IconButton color="primary" onClick={() => onDelete(id)}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
