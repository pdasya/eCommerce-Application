import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectIsProductSelected, selectProduct } from '@store/product/product.slice';
import { generatePath, useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/index';
import { catalogDefaultCategorySlug } from '@config/constants';
import { toast } from 'react-toastify';
import { getAllCategoryAncestorsByProductId } from '@/API/categories/get-categories';
import { ICategory } from '@/interfaces/category.interface';
import { Breadcrumb } from '../breadcrumb/breadcrumb.component';
import styles from './product-breadcrumb.component.module.scss';

export const ProductBreadcrumb: FC = () => {
  const navigate = useNavigate();
  const [ancestors, setAncestors] = useState<ICategory[]>([]);
  const activeProduct = useAppSelector(selectProduct);
  const isProductSelected = useAppSelector(selectIsProductSelected);

  const handleCategoryChange = async (category?: ICategory) => {
    navigate(
      generatePath(RoutePath.catalog, {
        category: category ? category.slug : catalogDefaultCategorySlug,
      }),
    );
  };

  useEffect(() => {
    if (!isProductSelected) {
      return;
    }

    getAllCategoryAncestorsByProductId(activeProduct.id)
      .then(newAncestors => {
        setAncestors(newAncestors);
      })
      .catch(error => {
        toast(error);
      });
  }, [isProductSelected]);

  return (
    <div className={styles.root}>
      <Breadcrumb
        path={[
          { caption: 'All products' },
          ...ancestors,
          { caption: activeProduct.title },
        ]}
        onClick={category => handleCategoryChange(ancestors.find(item => item.id === category.id))}
      />
    </div>
  );
};
