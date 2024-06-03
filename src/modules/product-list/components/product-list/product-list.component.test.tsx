import React from 'react';
import { act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { catalogUpdating, update } from '@store/catalog/catalog.slice';
import { renderWithProviders } from '@/utils/render-with-providers.test-util';
import { ProductList } from './product-list.component';
import { IProduct } from '@/interfaces/interfaces';

describe('Product list', () => {
  test('snapshot match', () => {
    const mockProducts: IProduct[] = [
      {
        currency: 'currency1',
        currentPrice: 'price1',
        description: 'description1',
        id: 'id1',
        imageAlt: 'alt1',
        imageSrc: 'src1',
        slug: 'slug1',
        title: 'title1',
      },
      {
        currency: 'currency2',
        currentPrice: 'price2',
        description: 'description2',
        id: 'id2',
        imageAlt: 'alt2',
        imageSrc: 'src2',
        slug: 'slug2',
        title: 'title2',
        discountPrice: 'description2',
      },
    ];
    const { store, asFragment } = renderWithProviders(<ProductList />);

    expect(asFragment()).toMatchSnapshot('product-list-snapshot-1');

    act(() => store.dispatch(catalogUpdating()));

    expect(asFragment()).toMatchSnapshot('product-list-snapshot-2');

    act(() => store.dispatch(update(mockProducts)));

    expect(asFragment()).toMatchSnapshot('product-list-snapshot-3');
  });
});
