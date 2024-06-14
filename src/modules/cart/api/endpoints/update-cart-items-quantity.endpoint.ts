import { ICartItem } from '../../interfaces/cart-item.interface';
import { updateCartEndpoint } from './update-cart.endpoint';

type Item = Pick<ICartItem, 'id' | 'quantity'>;

type Options = {
  id: string;
  version: number;
  items: Item[];
};

export const updateCartItemsQuantityEndpoint = ({ id, version, items }: Options) =>
  updateCartEndpoint({
    id,
    version,
    actions: items.map(item => ({
      lineItemId: item.id,
      quantity: item.quantity,
      action: 'changeLineItemQuantity',
    })),
  });
