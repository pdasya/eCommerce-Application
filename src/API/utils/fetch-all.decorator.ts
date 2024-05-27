import { BaseResource, ClientResponse, PagedQueryResponse } from '@commercetools/platform-sdk';

interface IBaseOptions {
  offset?: number;
  limit?: number;
}

type Wrapable<T extends PagedQueryResponse = PagedQueryResponse> = (
  options?: IBaseOptions,
) => Promise<ClientResponse<T>>;

const defaultPageSize = 20;

export const fetchAllDecorator = <T extends PagedQueryResponse>(
  targetFn: Wrapable<T>,
): Wrapable<T> => {
  const wrapped: Wrapable<T> = async (options, ...rest) => {
    const limit = options?.limit || defaultPageSize;
    let offset = options?.offset || 0;
    let accumulator: BaseResource[] = [];
    let response: ClientResponse<T>;

    do {
      // Because in this case loop iterations are not independent of each-other
      // eslint-disable-next-line no-await-in-loop
      response = await targetFn({ ...options, offset }, ...rest);
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
