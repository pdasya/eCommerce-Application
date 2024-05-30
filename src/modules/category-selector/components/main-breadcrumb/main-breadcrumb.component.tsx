import React, { FC } from 'react';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import {
  resetActiveCategory,
  selectActiveCategoryAncestors,
  setActiveCategory,
} from '@store/category/category.slice';
import { Breadcrumb } from '../breadcrumb/breadcrumb.component';
import { ICategory } from '@/interfaces/category.interface';
import styles from './main-breadcrumb.component.module.scss';

export const MainBreadcrumb: FC = () => {
  const dispatch = useAppDispatch();
  const activeCategoryAncestors = useAppSelector(selectActiveCategoryAncestors);

  const handleCategoryChange = async (category?: ICategory) => {
    if (category) {
      dispatch(setActiveCategory(category));
    } else {
      dispatch(resetActiveCategory(category));
    }
  };

  return (
    <div className={styles.root}>
      <Breadcrumb
        path={[{ caption: 'All products' }, ...activeCategoryAncestors]}
        onClick={category =>
          handleCategoryChange(activeCategoryAncestors.find(item => item.id === category.id))
        }
      />
    </div>
  );
};
