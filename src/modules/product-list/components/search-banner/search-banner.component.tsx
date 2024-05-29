import React, { FC } from 'react';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { searchValue } from '@store/catalog/catalog.slice';

export const SearchBanner: FC = () => {
  const searchText = useAppSelector(searchValue);
  return <h2>Search results for: {searchText}</h2>;
};
