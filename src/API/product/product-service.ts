import { ProductProjection } from '@commercetools/platform-sdk';
import { client } from '@config/constants';

export const fetchProduct = async (slug: string): Promise<ProductProjection> => {
  const locale = 'en';
  const response = await client
    .getClient()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `slug.${locale}:"${slug}"`,
      },
    })
    .execute();
  const product = response.body.results;
  return product[0];
};
