import React, { FC, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Button } from '@mui/material';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import {
  selectCustomFilters,
  selectPriceFilter,
  selectPriceLimits,
  setPriceFilter,
  setCustomFilters,
  resetAllFilters,
  setCustomFilterOptions,
  setPriceLimits,
  searchValue,
} from '@store/catalog/catalog.slice';
import { capitalizeFirstLetter } from '@utils/capitalize-first-letter.util';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { toast } from 'react-toastify';
import { allowedAttributesNames } from '@config/allowed-filter-attributes';
import {
  selectActiveCategory,
  selectIsActiveCategoryInitialized,
} from '@store/category/category.slice';
import { useUpdateEffect } from '@hooks/use-update-effect.hook';
import { ControlWrapper } from '../control-wrapper/control-wrapper.component';
import { RangeControl } from '../range-control/range-control.component';
import { MultiChoiceControl } from '../multi-choice-control/multi-choice-control.component';
import { getFilterOptions } from '@/API/filtering/get-filter-options';
import { getPriceRange } from '@/API/filtering/get-price-range';
import * as styles from './filter-panel.component.module.scss';

type FilterPanelProps = {
  className?: string;
  onClose?: () => void;
};

export const FilterPanel: FC<FilterPanelProps> = ({ className = '', onClose }) => {
  const dispatch = useAppDispatch();
  const priceLimits = useAppSelector(selectPriceLimits);
  const priceFilter = useAppSelector(selectPriceFilter);
  const customFilters = useAppSelector(selectCustomFilters);
  const isCategoryInitialized = useAppSelector(selectIsActiveCategoryInitialized);
  const searchText = useAppSelector(searchValue);
  const activeCategory = useAppSelector(selectActiveCategory);

  const [price, setPrice] = useState(priceFilter);
  const [filters, setFilters] = useState<Record<string, Record<string, boolean>>>({});

  const filtersByCategories = useMemo(
    () => (activeCategory ? [`categories.id:subtree("${activeCategory.id}")`] : []),
    [activeCategory],
  );

  useEffect(() => {
    setFilters(customFilters);
  }, [customFilters]);

  const applyClickHandler = () => {
    dispatch(setPriceFilter(price));
    dispatch(setCustomFilters(filters));

    if (onClose) {
      onClose();
    }
  };

  const resetClickHandler = () => {
    dispatch(resetAllFilters());
    if (onClose) {
      onClose();
    }
  };

  const priceFilterChangeHandle = (payload: [string, { min: number; max: number }]) => {
    setPrice(payload[1]);
  };

  const customFiltersChangeHandler = (payload: [string, Record<string, boolean>]) =>
    setFilters({ ...filters, [payload[0]]: payload[1] });

  const updateFilters = () => {
    getFilterOptions({
      filter: filtersByCategories,
      searchValue: searchText,
    })
      .then(attributes => {
        Object.keys(attributes).forEach(name => {
          if (!allowedAttributesNames.includes(name)) {
            delete attributes[name];
          }
        });
        dispatch(setCustomFilterOptions(attributes));
      })
      .catch(error => toast.error(error));

    getPriceRange()
      .then(({ min, max }) => {
        const roundedLimits = {
          min: Math.floor(min),
          max: Math.ceil(max),
        };
        dispatch(setPriceLimits(roundedLimits));
        dispatch(setPriceFilter(roundedLimits));
      })
      .catch(error => toast.error(error));
  };

  useUpdateEffect(() => {
    if (!isCategoryInitialized) {
      return;
    }

    updateFilters();
  }, [
    searchText,
    activeCategory,
    isCategoryInitialized,
  ]);

  return (
    <div className={classNames(styles.root, className)}>
      <ControlWrapper
        caption="Price"
        isOpenDefault
        control={
          <RangeControl
            name="price"
            min={priceLimits.min}
            max={priceLimits.max}
            left={price.min}
            right={price.max}
            onChange={priceFilterChangeHandle}
          />
        }
      />
      {Object.entries(customFilters).map(([name, options]) => (
        <ControlWrapper
          key={name}
          caption={capitalizeFirstLetter(name)}
          control={
            <MultiChoiceControl
              name={name}
              options={options}
              onChange={customFiltersChangeHandler}
            />
          }
        />
      ))}
      <Button variant="contained" color="warning" onClick={applyClickHandler}>
        apply
      </Button>
      <Button variant="outlined" onClick={resetClickHandler}>
        reset all filters
      </Button>
    </div>
  );
};
