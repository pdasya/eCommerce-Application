import { ProductProjection } from '@commercetools/platform-sdk';
import { client } from '@config/constants';

export const fetchAllProducts = async (
  sortBy: string,
  limit: number,
  offset: number = 0,
  acc: ProductProjection[] = [],
): Promise<ProductProjection[]> => {
  const response = await client
    .getClient()
    .productProjections()
    .search()
    .get({ queryArgs: { sort: sortBy, limit, offset } })
    .execute();
  const { results } = response.body;
  const accumulatedResults = acc.concat(results);

  if (accumulatedResults.length < response.body.total!) {
    return fetchAllProducts(sortBy, limit, offset + limit, accumulatedResults);
  }
  return accumulatedResults;
};
