import { CategoryPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';
import { client } from '@config/constants';
import { fetchAllDecorator } from '../utils/fetch-all.decorator';
import { ICategory } from '@/interfaces/category.interface';

const getAllTopLevelCategoriesRequest = fetchAllDecorator(async options =>
  client
    .getClient()
    .categories()
    .get({ queryArgs: { ...options, where: 'parent is not defined' } })
    .execute(),
);

const getAllCategoriesRequest = fetchAllDecorator(async options =>
  client
    .getClient()
    .categories()
    .get({ queryArgs: { ...options } })
    .execute(),
);

const getAllCategoryChildrenByIdRequest = fetchAllDecorator(async options =>
  client
    .getClient()
    .categories()
    .get({ queryArgs: { ...options, where: `parent(id="${0}")` } })
    .execute(),
);

const getCategoriesResponseAdapter = (
  response: ClientResponse<CategoryPagedQueryResponse>,
  locale = 'en',
): ICategory[] =>
  response.body.results.map(({ id, name, description, slug }) => ({
    id,
    caption: name[locale],
    description: description ? description[locale] : '',
    slug: slug[locale],
  }));

export const getAllCategories = async () =>
  getCategoriesResponseAdapter(await getAllCategoriesRequest());

export const getAllTopLevelCategories = async () =>
  getCategoriesResponseAdapter(await getAllTopLevelCategoriesRequest());

export const getAllCategoryChildrenById = async () =>
  getCategoriesResponseAdapter(await getAllCategoryChildrenByIdRequest({}));
