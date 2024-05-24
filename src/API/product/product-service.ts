import { ProductProjection } from '@commercetools/platform-sdk';
import { client } from '@config/constants';

export const fetchProduct = async (slug: string): Promise<ProductProjection> => {
  const response = await client
    .getClient()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        where: `slug(en="${slug}")`,
        limit: 1,
      },
    })
    .execute();
  const product = response.body.results;

  return product[0];
};
