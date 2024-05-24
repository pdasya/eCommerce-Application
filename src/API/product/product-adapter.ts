import { Product } from '@commercetools/platform-sdk';
import { ISingleProduct } from '@/interfaces/interfaces';
import { fetchProduct } from './product-service';

function productAdapter(product: Product): ISingleProduct {
  const data = product.masterData.current;
  const images = data.masterVariant.images ? data.masterVariant.images : [];
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
  const attributes = data.masterVariant.attributes ? data.masterVariant.attributes : [];

  return {
    id: product.id,
    title,
    description,
    images,
    currentPrice,
    currency,
    discountPrice,
    attributes,
  };
}

export const getProduct = async (ID: string) => {
  const product = await fetchProduct(ID);
  return productAdapter(product);
};
