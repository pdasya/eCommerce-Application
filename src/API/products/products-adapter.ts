import { ProductProjection } from '@commercetools/platform-sdk';
import { IProduct } from '@/interfaces/interfaces';
import { fetchAllProducts } from './products-service';

function productsAdapter(product: ProductProjection): IProduct {
  const data = product;
  const imageSrc = data.masterVariant.images
    ? data.masterVariant.images[0]
      ? data.masterVariant.images[0].url
      : '../public/assets/images/no-image.jpg'
    : '../public/assets/images/no-image.jpg';
  const imageAlt = data.masterVariant.images
    ? data.masterVariant.images.length > 0
      ? data.masterVariant.images[0].label
        ? data.masterVariant.images[0].label
        : 'product-image'
      : 'product-image'
    : 'product-image';
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
  const slug = data.slug.en;

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
  };
}

export const getProductsList = async (sortBy: string) => {
  const allProducts = await fetchAllProducts(sortBy, 20);
  return allProducts.map(product => productsAdapter(product));
};
