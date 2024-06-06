import { client } from '@config/constants';
import { SortBy } from '@config/sorting-options';
import { fetchAllDecorator, WrapableOptions } from '../utils/fetch-all.decorator';
import { getProductsResponseAdapter } from './products-adapter';
import { IProduct } from '@/interfaces/interfaces';

export type FetchProductsOptions = {
  sort?: SortBy;
  filter?: string[];
  searchValue?: string;
};

export const fetchAllProducts = fetchAllDecorator(
  async ({ sort, filter, searchValue, limit, offset }: WrapableOptions<FetchProductsOptions>) =>
    client
      .getClient()
      .productProjections()
      .search()
      .get({ queryArgs: { sort, filter, fuzzy: true, 'text.en': searchValue, limit, offset } })
      .execute(),
);

export const getProductsList = async (options: FetchProductsOptions): Promise<IProduct[]> =>
  getProductsResponseAdapter(await fetchAllProducts(options));
