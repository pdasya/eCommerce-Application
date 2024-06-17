import React, { FC } from 'react';
import { Box } from '@mui/material';
import CartItem from '../cart-item/cart-item';

interface ICartItem {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  initialPrice: number;
  finalPrice: number;
  quantity: number;
}

interface CartItemListProps {
  cartItems: ICartItem[];
  onIncrement: (item: ICartItem) => void;
  onDecrement: (item: ICartItem) => void;
  onRemove: (item: ICartItem) => void;
}

export const CartItemList: FC<CartItemListProps> = ({
  cartItems,
  onIncrement,
  onDecrement,
  onRemove,
}) => (
  <Box>
    {cartItems.map(item => (
      <CartItem
        key={item.id}
        name={item.name}
        slug={item.slug}
        imageUrl={item.imageUrl}
        initialPrice={item.initialPrice}
        finalPrice={item.finalPrice}
        quantity={item.quantity}
        onIncrement={() => onIncrement(item)}
        onDecrement={() => onDecrement(item)}
        onRemove={() => onRemove(item)}
      />
    ))}
  </Box>
);
