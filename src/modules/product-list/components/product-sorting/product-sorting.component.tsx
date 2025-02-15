import React, { FC, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { selectSort, sort } from '@store/catalog/catalog.slice';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { SortBy } from '@config/sorting-options';
import { Typography } from '@mui/material';
import * as styles from './product-sorting.component.module.scss';

export const ProductSort: FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSort);
  const [sortValue, setSortValue] = useState(sortBy);
  const handleChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as SortBy);
    dispatch(sort(event.target.value as SortBy));
  };

  return (
    <>
      <Typography className={styles.sortingLabel}>Sort by</Typography>
      <FormControl className={styles.sortingInput} sx={{ m: 1, maxWidth: 200 }} size="small">
        <Select id="sort-product" value={sortValue} onChange={handleChange}>
          <MenuItem value="createdAt asc">Default</MenuItem>
          <MenuItem value="name.en asc">Product name A-Z</MenuItem>
          <MenuItem value="name.en desc">Product name Z-A</MenuItem>
          <MenuItem value="price asc">Price low to high</MenuItem>
          <MenuItem value="price desc">Price high to low</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
