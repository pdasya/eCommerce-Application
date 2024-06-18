import { ICartItem } from '../../interfaces/cart-item.interface';
import { updateCartEndpoint } from './update-cart.endpoint';

type Options = {
  id: string;
  version: number;
  items: Pick<ICartItem, 'id'>[];
};

export const removeCartItemsEndpoint = ({ id, version, items }: Options) =>
  updateCartEndpoint({
    id,
    version,
    actions: items.map(item => ({ lineItemId: item.id, action: 'removeLineItem' })),
  });
