import React, { FC, useEffect, useState } from 'react';
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
} from '@store/catalog/catalog.slice';
import { capitalizeFirstLetter } from '@utils/capitalize-first-letter.util';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { ControlWrapper } from '../control-wrapper/control-wrapper.component';
import { RangeControl } from '../range-control/range-control.component';
import { MultiChoiceControl } from '../multi-choice-control/multi-choice-control.component';
import styles from './filter-panel.component.module.scss';

type FilterPanelProps = {
  className?: string;
};

export const FilterPanel: FC<FilterPanelProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const priceLimits = useAppSelector(selectPriceLimits);
  const priceFilter = useAppSelector(selectPriceFilter);
  const customFilters = useAppSelector(selectCustomFilters);
  const [price, setPrice] = useState(priceFilter);
  const [filters, setFilters] = useState<Record<string, Record<string, boolean>>>({});

  useEffect(() => {
    setFilters(customFilters);
  }, [customFilters]);

  return (
    <div className={classNames(styles.root, className)}>
      <ControlWrapper
        caption="Price"
        control={
          <RangeControl
            min={priceLimits.min}
            max={priceLimits.max}
            left={price.min}
            right={price.max}
            onChange={([min, max]) => {
              setPrice({ min, max });
            }}
          />
        }
      />
      {Object.entries(customFilters).map(([name, options]) => (
        <ControlWrapper
          caption={capitalizeFirstLetter(name)}
          control={
            <MultiChoiceControl
              initialState={customFilters[name]}
              options={options}
              onChange={value => {
                setFilters({ ...filters, [name]: value });
              }}
            />
          }
          key={name}
        />
      ))}
      <Button
        variant="contained"
        color="warning"
        onClick={() => {
          dispatch(setPriceFilter(price));
          dispatch(setCustomFilters(filters));
        }}>
        apply
      </Button>
      <Button variant="outlined" onClick={() => dispatch(resetAllFilters())}>
        reset all filters
      </Button>
    </div>
  );
};
