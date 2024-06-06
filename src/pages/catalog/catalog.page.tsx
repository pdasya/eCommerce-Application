import React, { FC, useEffect, useMemo } from 'react';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { ProductList } from '@modules/product-list';
import {
  catalogUpdating,
  catalogUpdatingEnd,
  searchValue,
  selectCustomFilters,
  selectIsFiltersInitialized,
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
  selectIsActiveCategoryInitialized,
  setActiveCategory,
  setActiveCategoryAncestors,
} from '@store/category/category.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { catalogDefaultCategorySlug, defaultRequestPageSize } from '@config/constants';
import { MainBreadcrumb } from '@modules/category-selector';
import { CustomPagination } from '@modules/pagination';
import { getCategoryById, getCategoryBySlug } from '@/API/categories/get-categories';
import styles from './catalog.page.module.scss';
import { getProductsList } from '@/API/products/products-service';

export const CatalogPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isFilterPanelOpen, setFilterPanelOpen] = React.useState(false);
  const [productsTotalCount, setProductsTotalCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const sortBy = useAppSelector(selectSort);
  const searchText = useAppSelector(searchValue);
  const priceFilter = useAppSelector(selectPriceFilter);
  const activeCategory = useAppSelector(selectActiveCategory);
  const customFilters = useAppSelector(selectCustomFilters);
  const isCategoryInitialized = useAppSelector(selectIsActiveCategoryInitialized);
  const isFiltersInitialized = useAppSelector(selectIsFiltersInitialized);

  const categorySlug = location.pathname.split('/').pop() || '';

  useEffect(() => {
    if (categorySlug === catalogDefaultCategorySlug) {
      if (!isCategoryInitialized || categorySlug !== activeCategory?.slug) {
        dispatch(resetActiveCategory());
      }

      return;
    }

    dispatch(loading({}));

    getCategoryBySlug(categorySlug)
      .then(category => {
        if (category.slug === activeCategory?.slug) {
          return;
        }

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
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    setCurrentPage(page);
  }, [location]);

  useEffect(() => {
    navigate(`${location.pathname}`);
  }, [
    sortBy,
    priceFilter,
    customFilters,
    searchText,
    activeCategory,
  ]);

  useEffect(() => {
    if (!isCategoryInitialized || !isFiltersInitialized) {
      return;
    }

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
      limit: defaultRequestPageSize,
      offset: (currentPage - 1) * defaultRequestPageSize,
    })
      .then(productsList => {
        dispatch(update(productsList.products));
        setProductsTotalCount(productsList.totalCount);
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
    currentPage,
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
      <CustomPagination pageCount={Math.ceil(productsTotalCount / defaultRequestPageSize)} />
    </div>
  );
};
