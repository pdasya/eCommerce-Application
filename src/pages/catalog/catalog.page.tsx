import React, { FC, useEffect, useMemo } from 'react';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { ProductList } from '@modules/product-list';
import {
  catalogUpdating,
  catalogUpdatingEnd,
  searchValue,
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
import { Button, Drawer, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { ProductSearch } from '@modules/product-list/components/product-search/product-search.component';
import { ProductSort } from '@modules/product-list/components/product-sorting/product-sorting.component';
import { SearchBanner } from '@modules/product-list/components/search-banner/search-banner.component';
import { CategorySelector } from '@modules/category-selector/components/category-selector/category-selector.component';
import {
  resetActiveCategory,
  selectActiveCategory,
  setActiveCategory,
  setActiveCategoryAncestors,
} from '@store/category/category.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { catalogDefaultCategorySlug } from '@config/constants';
import { MainBreadcrumb } from '@modules/category-selector';
import { getProductsList } from '@/API/products/products-adapter';
import { getCategoryById, getCategoryBySlug } from '@/API/categories/get-categories';
import styles from './catalog.page.module.scss';

export const CatalogPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isFilterPanelOpen, setFilterPanelOpen] = React.useState(false);

  const sortBy = useAppSelector(selectSort);
  const searchText = useAppSelector(searchValue);
  const priceFilter = useAppSelector(selectPriceFilter);
  const activeCategory = useAppSelector(selectActiveCategory);
  const customFilters = useAppSelector(selectCustomFilters);

  const location = useLocation().pathname.split('/');
  const categorySlug = location[location.length - 1];

  useEffect(() => {
    console.log(categorySlug);
    if (categorySlug === catalogDefaultCategorySlug) {
      dispatch(resetActiveCategory());
      return;
    }

    dispatch(loading({}));

    getCategoryBySlug(categorySlug)
      .then(category => {
        dispatch(setActiveCategory(category));

        Promise.all(category.ancestors.map(({ id }) => getCategoryById(id))).then(ancestors =>
          dispatch(setActiveCategoryAncestors(ancestors.concat(category))),
        );
      })
      .catch(() => {
        navigate('/404', { replace: true });
      })
      .finally(() => dispatch(loadEnd({})));
  }, [categorySlug]);

  const toggleFilterPanel = (newOpen: boolean) => () => {
    setFilterPanelOpen(newOpen);
  };

  const filtersByPrice = useMemo(
    () => [`variants.price.centAmount:range (${priceFilter.min * 10} to ${priceFilter.max * 10})`],
    [priceFilter],
  );

  const filtersByAttributes = useMemo(
    () =>
      Object.entries(customFilters)
        .filter(entries => Object.values(entries[1]).some(value => value === true))
        .map(
          ([attribute, values]) =>
            `variants.attributes.${attribute}:${Object.entries(values)
              .filter(entries => entries[1] === true)
              .map(([key]) => `"${key}"`)
              .join(', ')}`,
        ),
    [customFilters],
  );

  const filtersByCategories = useMemo(
    () => (activeCategory ? [`categories.id:subtree("${activeCategory.id}")`] : []),
    [activeCategory],
  );

  useEffect(() => {
    dispatch(loading({}));
    dispatch(catalogUpdating());

    getProductsList({
      sort: sortBy,
      filter: [
        ...filtersByPrice,
        ...filtersByAttributes,
        ...filtersByCategories,
      ],
      searchValue: searchText,
    })
      .then(productsList => {
        dispatch(update(productsList));
        dispatch(clear());
      })
      .catch(error => toast.error(error))
      .finally(() => {
        dispatch(loadEnd({}));
        dispatch(catalogUpdatingEnd());
      });
  }, [
    sortBy,
    priceFilter,
    customFilters,
    searchText,
    activeCategory,
  ]);

  return (
    <div className={styles.page}>
      <ProductSearch />
      <MainBreadcrumb />
      <div className={styles.main}>
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
              gridColumn: 'span 1',
              gridRow: 'span 2',
            },
          }}>
          <FilterPanel className={styles.filterPanel} />
        </Box>

        <Paper className={styles.sortPanel}>
          <div className={styles.buttonsContainer}>
            <CategorySelector />
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                width: '100%',
              }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ display: 'flex', width: '100%' }}
                onClick={toggleFilterPanel(true)}>
                Filters
              </Button>
            </Box>
          </div>
          <ProductSort />
        </Paper>
        <div className={styles.productList}>
          {searchText ? <SearchBanner /> : ''}
          <ProductList />
        </div>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
        }}>
        <Drawer open={isFilterPanelOpen} onClose={toggleFilterPanel(false)}>
          <Button onClick={toggleFilterPanel(false)}>Close</Button>
          <FilterPanel className={styles.filterPanel} onClose={toggleFilterPanel(false)} />
        </Drawer>
      </Box>
    </div>
  );
};
