import {
  ClientResponse,
  FacetResult,
  ProductProjectionPagedSearchResponse,
  RangeFacetResult,
} from '@commercetools/platform-sdk';
import { client } from '@config/constants';

interface IPriceRange {
  min: number;
  max: number;
}

function isRangeFacetResult(facetResult: FacetResult): facetResult is RangeFacetResult {
  return (facetResult as RangeFacetResult).ranges !== undefined;
}

function priceRangeResponseAdapter(
  response: ClientResponse<ProductProjectionPagedSearchResponse>,
): IPriceRange | never {
  const priceRangeFacet: FacetResult = response.body.facets['variants.price.centAmount'];
  if (isRangeFacetResult(priceRangeFacet)) {
    const minPrice = parseFloat((priceRangeFacet.ranges[0].min / 10).toFixed(2));
    const maxPrice = parseFloat((priceRangeFacet.ranges[0].max / 10).toFixed(2));

    return { min: minPrice, max: maxPrice };
  }

  throw new Error('Unable to get price range.');
}

export const getPriceRange = async (): Promise<IPriceRange> => {
  const response = await client
    .getClient()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        facet: [
          'variants.price.centAmount:range(0 to *)',
        ],
        limit: 0,
      },
    })
    .execute();

  return priceRangeResponseAdapter(response);
};
