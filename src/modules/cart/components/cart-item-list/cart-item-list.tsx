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
}

export const CartItemList: FC<CartItemListProps> = ({ cartItems }) => (
  <Box>
    {cartItems.map(item => (
      <CartItem
        key={item.id}
        id={item.id}
        name={item.name}
        slug={item.slug}
        imageUrl={item.imageUrl}
        initialPrice={item.initialPrice}
        finalPrice={item.finalPrice}
        quantity={item.quantity}
      />
    ))}
  </Box>
);
