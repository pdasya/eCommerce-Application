import React, { FC } from 'react';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectActiveCategoryAncestors } from '@store/category/category.slice';
import { generatePath, useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/index';
import { catalogDefaultCategorySlug } from '@config/constants';
import { Breadcrumb } from '../breadcrumb/breadcrumb.component';
import { ICategory } from '@/interfaces/category.interface';
import * as styles from './main-breadcrumb.component.module.scss';

export const MainBreadcrumb: FC = () => {
  const navigate = useNavigate();
  const activeCategoryAncestors = useAppSelector(selectActiveCategoryAncestors);

  const handleCategoryChange = async (category?: ICategory) => {
    navigate(
      generatePath(RoutePath.catalog, {
        category: category ? category.slug : catalogDefaultCategorySlug,
      }),
    );
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
