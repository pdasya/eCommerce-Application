import { Product } from '@commercetools/platform-sdk';
import { client } from '@config/constants';

export const fetchAllProducts = async (
  limit: number,
  offset: number = 0,
  acc: Product[] = [],
): Promise<Product[]> => {
  const response = await client
    .getClient()
    .products()
    .get({ queryArgs: { limit, offset } })
    .execute();
  const { results } = response.body;
  const accumulatedResults = acc.concat(results);

  if (accumulatedResults.length < response.body.total!) {
    return fetchAllProducts(limit, offset + limit, accumulatedResults);
  }

  return accumulatedResults;
};
