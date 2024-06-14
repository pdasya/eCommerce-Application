import { apiFlowManager } from '@config/constants';
import { cartResponseAdapter } from '../adapters/cart-response.adapter';

const getMyActiveCartRequest = async () =>
  apiFlowManager.getClient().me().activeCart().get().execute();

export const getMyActiveCartEndpoint = async () => {
  try {
    return cartResponseAdapter(await getMyActiveCartRequest());
  } catch (error) {
    if (error.code === 404) {
      return null;
    }
    throw error;
  }
};
