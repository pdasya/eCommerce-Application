import { apiFlowManager } from '@config/constants';
import { fetchAllDecorator, WrapableOptions } from '../utils/fetch-all.decorator';
import { ICategory } from '@/interfaces/category.interface';
import {
  getCategoriesResponseAdapter,
  getCategoryResponseAdapter,
  getProductCategoryAncestorsIdsResponseAdapter,
} from './get-categories-response.adapter';

const getAllTopLevelCategoriesRequest = fetchAllDecorator(async options =>
  apiFlowManager
    .getClient()
    .categories()
    .get({ queryArgs: { ...options, where: 'parent is not defined' } })
    .execute(),
);

const getAllCategoriesRequest = fetchAllDecorator(async options =>
  apiFlowManager
    .getClient()
    .categories()
    .get({ queryArgs: { ...options } })
    .execute(),
);

const getAllSubCategoriesByParentIdRequest = fetchAllDecorator(
  async ({ id, ...options }: WrapableOptions<{ id: string }>) =>
    apiFlowManager
      .getClient()
      .categories()
      .get({ queryArgs: { ...options, where: `parent(id="${id}")` } })
      .execute(),
);

const getCategoriesByProductIdRequest = async ({
  id,
  ...options
}: WrapableOptions<{ id: string }>) =>
  apiFlowManager
    .getClient()
    .products()
    .withId({ ID: id })
    .get({ queryArgs: { ...options } })
    .execute();

const getCategoryByIdRequest = async (id: string) =>
  apiFlowManager.getClient().categories().withId({ ID: id }).get().execute();

const getCategoryBySlugRequest = async (categorySlug: string, locale = 'en') =>
  apiFlowManager
    .getClient()
    .categories()
    .get({
      queryArgs: {
        where: `slug(${locale}="${categorySlug}")`,
      },
    })
    .execute();

export const getAllCategories = async (): Promise<ICategory[]> =>
  getCategoriesResponseAdapter(await getAllCategoriesRequest());

export const getAllTopLevelCategories = async (): Promise<ICategory[]> =>
  getCategoriesResponseAdapter(await getAllTopLevelCategoriesRequest());

export const getAllSubCategoriesByParentId = async (id: string): Promise<ICategory[]> =>
  getCategoriesResponseAdapter(await getAllSubCategoriesByParentIdRequest({ id }));

export const getCategoryById = async (id: string): Promise<ICategory> =>
  getCategoryResponseAdapter(await getCategoryByIdRequest(id));

export const getCategoryBySlug = async (categorySlug: string): Promise<ICategory> => {
  const categories = getCategoriesResponseAdapter(await getCategoryBySlugRequest(categorySlug));

  if (categories.length !== 1) {
    throw new Error('More than one category with the same slug or no category found.');
  }

  return categories[0];
};

export const getAllCategoryAncestorsByProductId = async (id: string): Promise<ICategory[]> => {
  const ancestorsIds = getProductCategoryAncestorsIdsResponseAdapter(
    await getCategoriesByProductIdRequest({ id }),
  );
  const ancestors = await Promise.all(ancestorsIds.map(item => getCategoryByIdRequest(item)));
  return ancestors.map(item => getCategoryResponseAdapter(item));
};
