import { ICartItem } from '../../interfaces/cart-item.interface';
import { updateCartEndpoint } from './update-cart.endpoint';

type Item = Pick<ICartItem, 'sku'> & Partial<Pick<ICartItem, 'quantity'>>;

type Options = {
  id: string;
  version: number;
  items: Item[];
};

export const addCartItemsEndpoint = ({ id, version, items }: Options) =>
  updateCartEndpoint({
    id,
    version,
    actions: items.map(item => ({ ...item, action: 'addLineItem' })),
  });
