import { ProductProjection } from '@commercetools/platform-sdk';
import { IProduct } from '@/interfaces/interfaces';
import { fetchAllProducts } from './products-service';

function productsAdapter(product: ProductProjection): IProduct {
  const imageSrc = product.masterVariant.images
    ? product.masterVariant.images[0]
      ? product.masterVariant.images[0].url
      : '../public/assets/images/no-image.jpg'
    : '../public/assets/images/no-image.jpg';
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
  };
}

export const getProductsList = async (sortBy: string) => {
  const allProducts = await fetchAllProducts(sortBy, 20);
  return allProducts.map(product => productsAdapter(product));
};
