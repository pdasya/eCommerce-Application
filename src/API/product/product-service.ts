import { Product } from '@commercetools/platform-sdk';
import { client } from '@config/constants';

export const fetchProduct = async (ID: string): Promise<Product> => {
  const response = await client.getClient().products().withId({ ID }).get().execute();
  const product = response.body;

  return product;
};
