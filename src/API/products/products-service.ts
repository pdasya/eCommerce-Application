import { client } from '@config/constants';
import { SortBy } from '@config/sorting-options';
import { fetchAllDecorator, WrapableOptions } from '../utils/fetch-all.decorator';
import { getProductsResponseAdapter } from './products-adapter';
import { IProductList } from '@/interfaces/interfaces';

export type FetchProductsOptions = {
  sort?: SortBy;
  filter?: string[];
  searchValue?: string;
};

const fetchProducts = async ({
  sort,
  filter,
  searchValue,
  limit,
  offset,
}: WrapableOptions<FetchProductsOptions>) =>
  client
    .getClient()
    .productProjections()
    .search()
    .get({ queryArgs: { sort, filter, fuzzy: true, 'text.en': searchValue, limit, offset } })
    .execute();

export const fetchAllProducts = fetchAllDecorator(fetchProducts);

export const getAllProductsList = async (
  options: WrapableOptions<FetchProductsOptions>,
): Promise<IProductList> => getProductsResponseAdapter(await fetchAllProducts(options));

export const getProductsList = async (
  options: WrapableOptions<FetchProductsOptions>,
): Promise<IProductList> => getProductsResponseAdapter(await fetchProducts(options));
