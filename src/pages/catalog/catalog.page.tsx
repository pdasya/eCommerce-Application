import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { ProductList } from '@modules/product-list';
import {
  selectCustomFilters,
  selectPriceFilter,
  selectSort,
  update,
} from '@store/catalog/catalog.slice';
import { toast } from 'react-toastify';
import { loadEnd, loading } from '@store/misc/misc.slice';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { clear } from '@store/product/product.slice';
import { FilterPanel } from '@modules/filter-panel';
import { Button, Drawer } from '@mui/material';
import { Box } from '@mui/system';
import { ProductSearch } from '@modules/product-list/components/product-search/product-search.component';
import { getProductsList } from '@/API/products/products-adapter';
import styles from './catalog.page.module.scss';

export const CatalogPage: FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSort);
  const priceFilter = useAppSelector(selectPriceFilter);
  const customFilters = useAppSelector(selectCustomFilters);
  const [isFilterPanelOpen, setFilterPanelOpen] = React.useState(false);

  const toggleFilterPanel = (newOpen: boolean) => () => {
    setFilterPanelOpen(newOpen);
  };

  useEffect(() => {
    dispatch(loading({}));
    getProductsList({
      sort: sortBy,
      filter: [
        `variants.price.centAmount:range (${priceFilter.min * 10} to ${priceFilter.max * 10})`,
        ...Object.entries(customFilters)
          .filter(entries => Object.values(entries[1]).some(value => value === true))
          .map(
            ([attribute, values]) =>
              `variants.attributes.${attribute}:${Object.entries(values)
                .filter(entries => entries[1] === true)
                .map(([key]) => `"${key}"`)
                .join(', ')}`,
          ),
      ],
    })
      .then(productsList => {
        dispatch(update(productsList));
        dispatch(clear());
      })
      .catch(error => toast.error(error))
      .finally(() => {
        dispatch(loadEnd({}));
      });
  }, [
    sortBy,
    priceFilter,
    customFilters,
  ]);

  return (
    <div className={styles.page}>
      <ProductSearch />
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          width: '100%',
        }}>
        <Button
          variant="contained"
          color="warning"
          sx={{ display: 'flex', width: '100%' }}
          onClick={toggleFilterPanel(true)}>
          Show filters
        </Button>
      </Box>
      <div className={styles.main}>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex', gridColumn: 'span 1' },
          }}>
          <FilterPanel className={styles.filterPanel} />
        </Box>

        <ProductList />
      </div>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
        }}>
        <Drawer open={isFilterPanelOpen} onClose={toggleFilterPanel(false)}>
          <FilterPanel className={styles.filterPanel} />
        </Drawer>
      </Box>
    </div>
  );
};
