import React, { FC } from 'react';
import { Button } from '@mui/material';

import styles from './breadcrumb.component.module.scss';
import { getAllCategories, getAllCategoryChildrenById } from '@/API/categories/get-categories';

export const Breadcrumb: FC = () => (
  <div className={styles.root}>
    <Button
      variant="contained"
      color="success"
      onClick={async () => {
        console.log(await getAllCategories());
        console.log(await getAllCategoryChildrenById());
      }}>
      Get categories
    </Button>
  </div>
);
