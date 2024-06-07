import { BaseResource, ClientResponse, PagedQueryResponse } from '@commercetools/platform-sdk';
import { defaultRequestPageSize } from '@config/constants';

export type WrapableOptions<T extends object = object> = {
  offset?: number;
  limit?: number;
} & T;

export type Wrapable<T extends PagedQueryResponse, K extends WrapableOptions> = (
  options?: K,
) => Promise<ClientResponse<T>>;

export const fetchAllDecorator = <K extends WrapableOptions, T extends PagedQueryResponse>(
  targetFn: Wrapable<T, K>,
): Wrapable<T, K> => {
  const wrapped: Wrapable<T, K> = async (options: K) => {
    const limit = options?.limit || defaultRequestPageSize;
    let offset = options?.offset || 0;
    let accumulator: BaseResource[] = [];
    let response: ClientResponse<T>;

    do {
      const opts = { ...options, offset };
      // Because in this case loop iterations are not independent of each-other
      // eslint-disable-next-line no-await-in-loop
      response = await targetFn({ ...opts });
      accumulator = accumulator.concat(response.body.results);
      offset += limit;
    } while (accumulator.length < (response.body.total || 0));

    response.body = {
      ...response.body,
      count: accumulator.length,
      limit: accumulator.length,
      offset: options?.offset || 0,
      total: accumulator.length,
      results: accumulator,
    };

    return response;
  };

  return wrapped;
};
