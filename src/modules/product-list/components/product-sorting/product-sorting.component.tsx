import React, { FC, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import styles from './product-sorting.component.module.scss';

export const ProductSort: FC = () => {
  const [sort, setSort] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <Paper className={styles.sortingContainer} sx={{ mb: 1 }}>
      <FormControl className={styles.sortingInput} sx={{ m: 1, maxWidth: 200 }} size="small">
        <FormHelperText sx={{ m: 0 }}>Sort by</FormHelperText>
        <Select id="sort-product" value={sort} onChange={handleChange} displayEmpty>
          <MenuItem value="">Default</MenuItem>
          <MenuItem value={10}>Product name A-Z</MenuItem>
          <MenuItem value={20}>Product name Z-A</MenuItem>
          <MenuItem value={30}>Price low to high</MenuItem>
          <MenuItem value={40}>Price high to low</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};
