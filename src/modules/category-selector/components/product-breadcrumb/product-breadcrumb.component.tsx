import React, { FC, useEffect } from 'react';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import {
  resetActiveCategory,
  selectActiveCategoryAncestors,
  setActiveCategoryAncestors,
} from '@store/category/category.slice';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { selectIsProductSelected, selectProduct } from '@store/product/product.slice';
import { generatePath, useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/index';
import { getAllCategoryAncestorsByProductId } from '@/API/categories/get-categories';
import { ICategory } from '@/interfaces/category.interface';
import { Breadcrumb } from '../breadcrumb/breadcrumb.component';
import styles from './product-breadcrumb.component.module.scss';

export const ProductBreadcrumb: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeCategoryAncestors = useAppSelector(selectActiveCategoryAncestors);
  const activeProduct = useAppSelector(selectProduct);
  const isProductSelected = useAppSelector(selectIsProductSelected);

  const handleCategoryChange = async (category?: ICategory) => {
    if (!category) {
      dispatch(resetActiveCategory());
    }

    navigate(generatePath(RoutePath.catalog, { category: category ? category.slug : '' }));
  };

  useEffect(() => {
    if (!isProductSelected) {
      return;
    }

    getAllCategoryAncestorsByProductId(activeProduct.id).then(ancestors =>
      dispatch(setActiveCategoryAncestors(ancestors)),
    );
  }, [isProductSelected]);

  return (
    <div className={styles.root}>
      <Breadcrumb
        path={[
          { caption: 'All products' },
          ...activeCategoryAncestors,
          { caption: activeProduct.title },
        ]}
        onClick={category =>
          handleCategoryChange(activeCategoryAncestors.find(item => item.id === category.id))
        }
      />
    </div>
  );
};
