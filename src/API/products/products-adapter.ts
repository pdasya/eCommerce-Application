import { Product } from '@commercetools/platform-sdk';
import { IProduct } from '@/interfaces/interfaces';
import { fetchAllProducts } from './products-service';

function productsAdapter(product: Product): IProduct {
  const data = product.masterData.current;
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

  return { id: product.id, title, description, imageSrc, currentPrice, currency, discountPrice };
}

export const getProductsList = async () => {
  const allProducts = await fetchAllProducts(20);
  return allProducts.map(product => productsAdapter(product));
};