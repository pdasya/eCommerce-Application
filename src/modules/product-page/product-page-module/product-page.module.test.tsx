import React from 'react';
import { act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { select } from '@store/product/product.slice';
import { renderWithProviders } from '@/utils/render-with-providers.test-util';
import { ISingleProduct } from '@/interfaces/interfaces';
import { Product } from './product-page.module';

describe('Product page module', () => {
  test('snapshot match', () => {
    const mockProduct: ISingleProduct = {
      currency: 'currency',
      currentPrice: 'price',
      description: 'description',
      images: [
        { dimensions: { w: 100, h: 100 }, url: 'img-url-1', label: 'img-label-1' },
        { dimensions: { w: 200, h: 200 }, url: 'img-url-2', label: 'img-label-2' },
      ],
      id: 'id',
      attributes: [
        { name: 'attribute1', value: 'value1' },
        { name: 'attribute2', value: 'value2' },
      ],
      title: 'title',
      discountPrice: 'description',
    };

    const { store, asFragment } = renderWithProviders(<Product />);

    expect(asFragment()).toMatchSnapshot('product-page-module-snapshot-1');

    act(() => store.dispatch(select(mockProduct)));

    expect(asFragment()).toMatchSnapshot('product-page-module-snapshot-2');
  });
});
