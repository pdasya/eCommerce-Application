import React, { FC, Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { generatePath, useNavigate } from 'react-router-dom';
import { Button, List, ListItemButton, ListItemText } from '@mui/material';
import { Popup } from '@mui/base/Unstable_Popup/Popup';
import { ClickAwayListener } from '@mui/base';
import classNames from 'classnames';
import { FullSizeLoading } from '@components/fullsize-loading/full-size-loading.component';
import { RoutePath } from '@routes/index';
import {
  getAllSubCategoriesByParentId,
  getAllTopLevelCategories,
  getCategoryById,
} from '@/API/categories/get-categories';
import { ICategory } from '@/interfaces/category.interface';
import { Breadcrumb } from '../breadcrumb/breadcrumb.component';
import styles from './category-selector.component.module.scss';

export const CategorySelector: FC = () => {
  const navigate = useNavigate();

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [localCategory, setLocalCategory] = useState<ICategory | null>(null);
  const [localSubCategories, setLocalSubCategories] = useState<ICategory[]>([]);
  const [localCategoryAncestors, setLocalCategoryAncestors] = useState<ICategory[]>([]);

  const isOpen = Boolean(anchor);

  const popupClose = () => {
    setAnchor(null);
    setLocalCategory(null);
    setLocalCategoryAncestors([]);
    setActiveIndex(0);
  };

  const handleCategoryApply = () => {
    navigate(
      generatePath(RoutePath.catalog, { category: localCategory ? localCategory.slug : '' }),
    );
    popupClose();
  };

  useEffect(() => {
    if (!localCategory) {
      setIsLoading(true);
      getAllTopLevelCategories()
        .then(categories => setLocalSubCategories(categories))
        .catch(error => toast.error(`Unable to update categories list: ${error}`))
        .finally(() => setIsLoading(false));
    }

    if (localCategory) {
      (async () => {
        setIsLoading(true);

        try {
          const subCategories = await getAllSubCategoriesByParentId(localCategory.id);

          if (!subCategories.length) {
            handleCategoryApply();
            return;
          }

          setLocalSubCategories(subCategories);

          const ancestors = await Promise.all(
            localCategory.ancestors.map(({ id }) => getCategoryById(id)),
          );

          setLocalCategoryAncestors(ancestors.concat(localCategory));
        } catch (error) {
          toast.error(`Unable to update categories list: ${error}`);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [localCategory]);

  const handlePopupOpenClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchor) {
      popupClose();
    } else {
      setAnchor(event.currentTarget);
    }
  };

  const handlePopupClickAway = () => {
    popupClose();
  };

  const handleCategoryChange = async (category?: ICategory) => {
    setIsLoading(true);

    setActiveIndex(0);

    if (!category) {
      setLocalCategory(null);
      setLocalCategoryAncestors([]);
      return;
    }

    setLocalCategory(category);
  };

  return (
    <div className={styles.root}>
      <ClickAwayListener onClickAway={handlePopupClickAway}>
        <div className={styles.clickAwayWrapper}>
          <Button
            aria-describedby="category-selector"
            type="button"
            variant="contained"
            className={styles.button}
            onClick={handlePopupOpenClick}>
            Categories
          </Button>
          <Popup
            strategy="absolute"
            id="category-selector"
            open={isOpen}
            anchor={anchor}
            placement="bottom-start"
            className={styles.popup}>
            <div className={styles.popupContent}>
              {isLoading ? (
                <FullSizeLoading isLoading />
              ) : (
                <>
                  <Breadcrumb
                    rootSegment={{ caption: 'All', id: '0' }}
                    path={localCategoryAncestors}
                    onClick={data =>
                      handleCategoryChange(
                        localCategoryAncestors.find(ancestor => ancestor.id === data.id),
                      )
                    }
                  />
                  <div className={styles.categoryWrapper}>
                    <div className={styles.categoryList}>
                      <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader">
                        {localSubCategories.map((category, index) => (
                          <ListItemButton
                            key={category.id}
                            onMouseOver={() => setActiveIndex(index)}
                            onClick={() => handleCategoryChange(category)}
                            className={classNames(
                              styles.categoryListItem,
                              index === activeIndex ? styles.categoryListItemActive : '',
                            )}>
                            <ListItemText primary={category.caption} />
                          </ListItemButton>
                        ))}
                      </List>
                    </div>
                    <div className={styles.categoryDescription}>
                      {localSubCategories[activeIndex]?.description}
                    </div>
                  </div>
                  <Button variant="contained" color="primary" onClick={handleCategoryApply}>
                    Apply
                  </Button>
                </>
              )}
            </div>
          </Popup>
        </div>
      </ClickAwayListener>
    </div>
  );
};
