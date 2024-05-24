import { ProductProjection } from '@commercetools/platform-sdk';
import { ISingleProduct } from '@/interfaces/interfaces';
import { fetchProduct } from './product-service';

function productAdapter(product: ProductProjection): ISingleProduct {
  const images = product.masterVariant.images ? product.masterVariant.images : [];
  const title = product.name.en;
  const description = product.description ? product.description.en : '';
  const price = product.masterVariant.prices ? product.masterVariant.prices : null;
  const currency = price ? '$' : '';
  const currentPrice = price ? price[0].value.centAmount / 10 : 0;
  const discountPrice = price
    ? price[0].discounted
      ? price[0].discounted.value.centAmount / 10
      : undefined
    : undefined;
  const attributes = product.masterVariant.attributes ? product.masterVariant.attributes : [];

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
