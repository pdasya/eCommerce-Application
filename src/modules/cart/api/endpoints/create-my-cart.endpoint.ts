import { apiFlowManager } from '@config/constants';
import { cartResponseAdapter } from '../adapters/cart-response.adapter';

const createMyCartRequest = async () =>
  apiFlowManager
    .getClient()
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
        country: 'US',
      },
    })
    .execute();

export const createMyCartEndpoint = async () => cartResponseAdapter(await createMyCartRequest());
