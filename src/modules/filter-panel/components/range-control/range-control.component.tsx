import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Slider } from '@mui/material';
import { IControlHandle } from '@modules/filter-panel/interfaces/control-handle.interface';
import { IControlBaseProps } from '@modules/filter-panel/interfaces/control-base-props.interface';
import { selectPriceFilter } from '@store/catalog/catalog.slice';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { NumberInput } from '../number-input/number-input.component';
import * as styles from './range-control.component.module.scss';

type Value = { min: number; max: number };

interface IRangeControlProps extends IControlBaseProps<Value> {
  min?: number;
  max: number;
  left: number;
  right: number;
  minRange?: number;
}

export const RangeControl = forwardRef<IControlHandle, IRangeControlProps>(
  ({ min = 0, max, left, right, minRange = 0, name, onChange, onDefaultChange }, ref) => {
    const [[leftValue, rightValue], setRange] = useState<[number, number]>([left, right]);
    const [isDefault, setIsDefault] = useState<boolean>(true);

    const handleSliderChange = (event: Event, [newLeftValue, newRightValue]: number[]) => {
      if (newRightValue - newLeftValue < minRange) {
        return;
      }

      setRange([newLeftValue, newRightValue]);
    };

    useEffect(() => {
      const isDefaultState = leftValue === min && rightValue === max;
      setIsDefault(isDefaultState);

      if (onChange) {
        onChange([name, { min: leftValue, max: rightValue }]);
      }
    }, [leftValue, rightValue]);

    useEffect(() => {
      if (onDefaultChange) {
        onDefaultChange(isDefault);
      }
    }, [isDefault]);

    const handleLeftInputChange = (
      event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent,
      value: number | null,
    ) => {
      if (value === null) {
        return;
      }

      if (rightValue - value < minRange) {
        setRange([leftValue, rightValue]);
      }

      setRange([value, rightValue]);
    };

    const handleRightInputChange = (
      event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent,
      value: number | null,
    ) => {
      if (value === null) {
        return;
      }

      if (value - leftValue < minRange) {
        setRange([leftValue, rightValue]);
      }

      setRange([leftValue, value]);
    };

    useImperativeHandle(ref, () => ({
      reset() {
        setRange([min, max]);
      },
      getIsDefault() {
        return isDefault;
      },
    }));

    // TODO: Issue #189: Fix filter controls rerender issues
    const priceFilter = useAppSelector(selectPriceFilter);
    useEffect(() => {
      setRange([priceFilter.min, priceFilter.max]);
    }, [priceFilter]);

    return (
      <div className={styles.root}>
        <div className={styles.inputs}>
          <NumberInput
            value={leftValue}
            min={min}
            max={max - minRange}
            onChange={handleLeftInputChange}
          />
          <NumberInput
            value={rightValue}
            min={min}
            max={max - minRange}
            onChange={handleRightInputChange}
          />
        </div>
        <Slider
          className={styles.slider}
          value={[leftValue, rightValue]}
          min={min}
          max={max}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
        />
      </div>
    );
  },
);
