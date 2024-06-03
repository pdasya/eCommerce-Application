import { ProductProjection } from '@commercetools/platform-sdk';
import { fetchAllProducts, FetchProductsOptions } from '../products/products-service';

function getFilterOptionsAdapter(products: ProductProjection[]): Record<string, string[]> {
  const attributesValuesDict: Record<string, Set<string>> = {};

  products.forEach(product => {
    product.masterVariant.attributes?.forEach(({ name, value }) => {
      if (!(name in attributesValuesDict)) {
        attributesValuesDict[name] = new Set();
      }

      attributesValuesDict[name].add(value);
    });

    product.variants.forEach(variant => {
      variant.attributes?.forEach(({ name, value }) => {
        if (!(name in attributesValuesDict)) {
          attributesValuesDict[name] = new Set();
        }

        attributesValuesDict[name].add(value);
      });
    });
  });

  const result: Record<string, string[]> = {};

  Object.entries(attributesValuesDict).forEach(([key, value]) => {
    result[key] = Array.from(value).sort();
  });

  return result;
}

export const getFilterOptions = async (options: FetchProductsOptions) => {
  const products = await fetchAllProducts(options);

  return getFilterOptionsAdapter(products);
};
