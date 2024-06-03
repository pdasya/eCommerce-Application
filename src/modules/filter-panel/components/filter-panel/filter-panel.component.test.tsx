import React from 'react';
import { act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setCustomFilters, setPriceFilter, setPriceLimits } from '@store/catalog/catalog.slice';
import { renderWithProviders } from '@/utils/render-with-providers.test-util';
import { FilterPanel } from './filter-panel.component';

describe('Filter panel', () => {
  test('snapshot match', () => {
    const { store, asFragment } = renderWithProviders(<FilterPanel />);
    const mockPriceLimits = { min: 10, max: 100 };
    const mockPriceFilter = { min: 20, max: 30 };
    const mockCustomFilters = {
      filter1: { option11: false, option12: false },
      filter2: { option21: false, option22: false },
    };

    expect(asFragment()).toMatchSnapshot('filter-panel-snapshot-1');

    act(() => store.dispatch(setPriceLimits(mockPriceLimits)));
    act(() => store.dispatch(setPriceFilter(mockPriceFilter)));

    expect(asFragment()).toMatchSnapshot('filter-panel-snapshot-2');

    act(() => store.dispatch(setCustomFilters(mockCustomFilters)));

    expect(asFragment()).toMatchSnapshot('filter-panel-snapshot-3');
  });
});
