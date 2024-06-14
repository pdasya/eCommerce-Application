import { apiFlowManager } from '@config/constants';
import { cartPagedResponseAdapter } from '../adapters/cart-response.adapter';
import { fetchAllDecorator } from '@/API/utils/fetch-all.decorator';

const getMyCartsAllRequest = fetchAllDecorator(async () =>
  apiFlowManager.getClient().me().carts().get().execute(),
);

export const getMyCartsAllEndpoint = async () =>
  cartPagedResponseAdapter(await getMyCartsAllRequest());
