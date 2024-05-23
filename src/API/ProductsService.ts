import { Product } from '@commercetools/platform-sdk';
import { client } from '@config/constants';
import { IProduct } from '@/interfaces/interfaces';

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

export const getProductsList = () => {
  const productsList: IProduct[] = [];
  fetchAllProducts(100).then(products => {
    products.forEach(product => {
      const data = product.masterData.current;
      const { id } = product;
      const imageSrc = data.masterVariant.images ? data.masterVariant.images[0].url : '';
      const title = data.name.en;
      const description = data.description ? data.description.en : '';
      const price = data.masterVariant.prices ? data.masterVariant.prices : null;
      const currency = price ? '$' : '';
      const currentPrice = price ? price[0].value.centAmount / 10 : 0;
      const discountPrice = price
        ? price[0].discounted
          ? price[0].discounted.value.centAmount / 10
          : undefined
        : undefined;
      productsList.push({
        id,
        title,
        description,
        imageSrc,
        currentPrice,
        currency,
        discountPrice,
      });
    });
  });

  return productsList;
};
