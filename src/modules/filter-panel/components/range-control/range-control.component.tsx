import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Slider } from '@mui/material';
import { IControlHandle } from '@modules/filter-panel/interfaces/control-handle.interface';
import { IControlBaseProps } from '@modules/filter-panel/interfaces/control-base-props.interface';
import { NumberInput } from '../number-input/number-input.component';
import styles from './range-control.component.module.scss';

type Value = [number, number];

interface IRangeControlProps extends IControlBaseProps<Value> {
  from?: number;
  to: number;
  minRange?: number;
}

export const RangeControl = forwardRef<IControlHandle, IRangeControlProps>(
  ({ from = 0, to, minRange = 0, onChange, onDefaultChange }, ref) => {
    const [[leftValue, rightValue], setRange] = useState<[number, number]>([from, to]);
    const [isDefault, setIsDefault] = useState<boolean>(true);

    const handleSliderChange = (event: Event, [newLeftValue, newRightValue]: number[]) => {
      if (newRightValue - newLeftValue < minRange) {
        return;
      }

      setRange([newLeftValue, newRightValue]);
    };

    useEffect(() => {
      const isDefaultState = leftValue === from && rightValue === to;
      setIsDefault(isDefaultState);

      if (onChange) {
        onChange([leftValue, rightValue], isDefaultState);
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
        setRange([from, to]);
      },
      getIsDefault() {
        return isDefault;
      },
    }));

    return (
      <div className={styles.root}>
        <div className={styles.inputs}>
          <NumberInput
            value={leftValue}
            min={from}
            max={to - minRange}
            onChange={handleLeftInputChange}
          />
          <NumberInput
            value={rightValue}
            min={from}
            max={to - minRange}
            onChange={handleRightInputChange}
          />
        </div>
        <Slider
          className={styles.slider}
          value={[leftValue, rightValue]}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
        />
      </div>
    );
  },
);
