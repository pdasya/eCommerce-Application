import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './filter-panel.component.module.scss';
import { MultiChoiceControl } from '../multi-choice-control/multi-choice-control.component';
import { RangeControl } from '../range-control/range-control.component';
import { ControlWrapper } from '../control-wrapper/control-wrapper.component';

type FilterPanelProps = {
  className?: string;
};

const brands = [
  { name: 'brand1' },
  { name: 'brand2' },
  { name: 'brand3' },
  { name: 'brand4' },
];

export const FilterPanel: FC<FilterPanelProps> = ({ className = '' }) => (
  <div className={classNames(styles.root, className)}>
    <ControlWrapper caption="Brand" control={<MultiChoiceControl options={brands} />} />
    <ControlWrapper caption="Price" control={<RangeControl to={100} />} />
  </div>
);
