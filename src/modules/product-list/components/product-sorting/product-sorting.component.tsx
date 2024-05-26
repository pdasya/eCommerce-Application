import React, { FC, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { selectSort, sort } from '@store/catalog/catalog.slice';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { SortBy } from '@config/sorting-options';
import styles from './product-sorting.component.module.scss';

export const ProductSort: FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSort);
  const [sortValue, setSortValue] = useState(sortBy);
  const handleChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as SortBy);
    dispatch(sort(event.target.value as SortBy));
  };

  return (
    <Paper className={styles.sortingContainer} sx={{ mb: 1 }}>
      <FormControl className={styles.sortingInput} sx={{ m: 1, maxWidth: 200 }} size="small">
        <FormHelperText sx={{ m: 0, fontSize: 14, fontWeight: 700 }}>Sort by</FormHelperText>
        <Select id="sort-product" value={sortValue} onChange={handleChange}>
          <MenuItem value="createdAt asc">Default</MenuItem>
          <MenuItem value="name.en asc">Product name A-Z</MenuItem>
          <MenuItem value="name.en desc">Product name Z-A</MenuItem>
          <MenuItem value="price asc">Price low to high</MenuItem>
          <MenuItem value="price desc">Price high to low</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};
