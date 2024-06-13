import { ProductProjection } from '@commercetools/platform-sdk';
import { apiFlowManager } from '@config/constants';

export const fetchProduct = async (slug: string): Promise<ProductProjection> => {
  const locale = 'en';
  const response = await apiFlowManager
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
