import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Grid } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline, Delete } from '@mui/icons-material';

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
    <Card sx={{ display: 'flex', marginBottom: 2 }}>
      <CardMedia component="img" sx={{ width: 150 }} image={imageUrl} alt={name} />
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="h5" variant="h5">
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          ${price.toFixed(2)}
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <IconButton color="primary" onClick={() => onRemove(id)}>
              <RemoveCircleOutline />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography>{quantity}</Typography>
          </Grid>
          <Grid item>
            <IconButton color="primary" onClick={() => onAdd(id)}>
              <AddCircleOutline />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="subtitle1" color="text.secondary">
          Total: ${totalPrice.toFixed(2)}
        </Typography>
      </CardContent>
      <CardContent>
        <IconButton color="secondary" onClick={() => onDelete(id)}>
          <Delete />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CartItem;
