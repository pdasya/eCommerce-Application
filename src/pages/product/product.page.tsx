import React, { FC, Fragment, useEffect } from 'react';
import { Product } from '@modules/product-page/product-page-module/product-page.module';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { loadEnd, loading } from '@store/misc/misc.slice';
import { clear, select } from '@store/product/product.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductBreadcrumb } from '@modules/category-selector';
import { getProduct } from '@/API/product/product-adapter';
import styles from './product.page.module.scss';

export const ProductPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/');
  const slug = location[location.length - 1];

  useEffect(() => {
    dispatch(loading({}));
    getProduct(slug)
      .then(product => dispatch(select(product)))
      .catch(() => {
        navigate('/404', { replace: true });
        dispatch(clear());
      })
      .finally(() => dispatch(loadEnd({})));
  }, [slug]);

  return (
    <>
      <div className={styles.breadcrumbs}>
        <ProductBreadcrumb />
      </div>
      <Product />;
    </>
  );
};
