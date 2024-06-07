import {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  Product,
} from '@commercetools/platform-sdk';
import { ICategory } from '@/interfaces/category.interface';

const categoryParser = (category: Category, locale = 'en'): ICategory => {
  const { id, name, description, slug, ancestors } = category;

  return {
    id,
    caption: name[locale],
    description: description ? description[locale] : '',
    slug: slug[locale],
    ancestors: ancestors.map(item => ({ id: item.id })),
  };
};

export const getCategoriesResponseAdapter = (
  response: ClientResponse<CategoryPagedQueryResponse>,
  locale = 'en',
): ICategory[] => response.body.results.map(item => categoryParser(item, locale));

export const getCategoryResponseAdapter = (
  response: ClientResponse<Category>,
  locale = 'en',
): ICategory => categoryParser(response.body, locale);

export const getProductCategoryAncestorsIdsResponseAdapter = (
  response: ClientResponse<Product>,
): string[] => response.body.masterData.current.categories.map(({ id }) => id);
