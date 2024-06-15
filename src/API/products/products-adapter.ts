import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { IProduct, IProductList } from '@/interfaces/interfaces';

export const productParser = (product: ProductProjection): IProduct => {
  const imageSrc = product.masterVariant.images
    ? product.masterVariant.images[0]
      ? product.masterVariant.images[0].url
      : './assets/images/no-image.jpg'
    : './assets/images/no-image.jpg';
  const imageAlt = product.masterVariant.images
    ? product.masterVariant.images.length > 0
      ? product.masterVariant.images[0].label
        ? product.masterVariant.images[0].label
        : 'product-image'
      : 'product-image'
    : 'product-image';
  const title = product.name.en;
  const description = product.description ? product.description.en : '';
  const price = product.masterVariant.prices ? product.masterVariant.prices : null;
  const currency = price ? '$' : '';
  const currentPrice = price ? (price[0].value.centAmount / 10).toFixed(2) : (0).toFixed(2);
  const discountPrice = price
    ? price[0].discounted
      ? (price[0].discounted.value.centAmount / 10).toFixed(2)
      : undefined
    : undefined;
  const slug = product.slug.en;

  return {
    id: product.id,
    title,
    description,
    imageSrc,
    imageAlt,
    currentPrice,
    currency,
    discountPrice,
    slug,
    sku: product.masterVariant.sku || '',
  };
};

export const getProductsResponseAdapter = (
  response: ClientResponse<ProductProjectionPagedSearchResponse>,
): IProductList => ({
  products: response.body.results.map(productParser),
  totalCount: response.body.total || 0,
});
