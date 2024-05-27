import { ProductProjection } from '@commercetools/platform-sdk';
import { client } from '@config/constants';
import { SortBy } from '@config/sorting-options';

export type FetchProductsOptions = {
  sort?: SortBy;
  filter?: string[];
  limit?: number;
  offset?: number;
  accumulator?: ProductProjection[];
};

export const fetchAllProducts = async (
  options: FetchProductsOptions,
): Promise<ProductProjection[]> => {
  const { sort = SortBy.default, filter = [], limit = 20, offset = 0, accumulator = [] } = options;

  const response = await client
    .getClient()
    .productProjections()
    .search()
    .get({ queryArgs: { sort, filter, limit, offset } })
    .execute();
  const { results } = response.body;
  const accumulatedResults = accumulator.concat(results);

  if (accumulatedResults.length < response.body.total!) {
    return fetchAllProducts({
      sort,
      filter,
      limit,
      offset: offset + limit,
      accumulator: accumulatedResults,
    });
  }

  return accumulatedResults;
};
