import React, { FC, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Divider, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { search, tempSearch, tempSearchValue } from '@store/catalog/catalog.slice';
import { useAppSelector } from '@hooks/use-app-selector.hook';

export const ProductSearch: FC = () => {
  const dispatch = useAppDispatch();
  const tempSearchText = useAppSelector(tempSearchValue);
  const [value, setValue] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    dispatch(tempSearch(e.target.value));
  };

  const handleClear = () => {
    setValue('');
    dispatch(search(''));
    dispatch(tempSearch(''));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(search(value));
  };

  return (
    <Paper
      component="form"
      sx={{
        m: 1,
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        gridArea: 'control',
      }}
      onSubmit={handleSearch}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for products"
        inputProps={{ 'aria-label': 'search for products' }}
        value={tempSearchText || value}
        onChange={handleInput}
      />
      {value.length > 0 || tempSearchText.length > 0 ? (
        <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={handleClear}>
          <ClearIcon />
        </IconButton>
      ) : (
        ''
      )}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
