import { CartUpdateAction } from '@commercetools/platform-sdk';
import { apiFlowManager } from '@config/constants';
import { cartResponseAdapter } from '../adapters/cart-response.adapter';

type Options = {
  id: string;
  version: number;
  actions: CartUpdateAction[];
};

const updateCartRequest = async ({ id, version, actions }: Options) =>
  apiFlowManager
    .getClient()
    .carts()
    .withId({ ID: id })
    .post({ body: { version, actions } })
    .execute();

export const updateCartEndpoint = async (options: Options) =>
  cartResponseAdapter(await updateCartRequest(options));
