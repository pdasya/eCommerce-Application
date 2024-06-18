import { apiFlowManager } from '@config/constants';
import { cartResponseAdapter } from '../adapters/cart-response.adapter';

type Options = {
  id: string;
  version: number;
};

const deleteCartRequest = async ({ id, version }: Options) =>
  apiFlowManager
    .getClient()
    .me()
    .carts()
    .withId({ ID: id })
    .delete({ queryArgs: { version } })
    .execute();

export const deleteCartEndpoint = async (options: Options) =>
  cartResponseAdapter(await deleteCartRequest(options));
