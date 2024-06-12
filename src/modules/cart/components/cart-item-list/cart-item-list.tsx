import React, { FC } from 'react';
import { Box } from '@mui/material';
import CartItem from '../cart-item/cart-item';

interface ICartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  oldPrice?: number;
  quantity: number;
}

interface CartItemListProps {
  cartItems: ICartItem[];
  handleAdd: (id: string) => void;
  handleRemove: (id: string) => void;
  handleDelete: (id: string) => void;
}

export const CartItemList: FC<CartItemListProps> = ({
  cartItems,
  handleAdd,
  handleRemove,
  handleDelete,
}) => (
  <Box>
    {cartItems.map(item => (
      <CartItem
        key={item.id}
        id={item.id}
        name={item.name}
        imageUrl={item.imageUrl}
        price={item.price}
        oldPrice={item.oldPrice}
        quantity={item.quantity}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onDelete={handleDelete}
      />
    ))}
  </Box>
);
