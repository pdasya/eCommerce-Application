import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectLoading } from '@store/misc/misc.slice';
import { ISingleProduct } from '@/interfaces/interfaces';
import { AttributeList } from '../component/product-attribute-list/product-attribute-list';
import { AttributeCollapse } from '../component/product-attribute-collapse/product-attribute-collapse';
import { ProductImage } from '../component/product-images/product-images';
import styles from './product-page.component.module.scss';

export const ProductItem: FC<ISingleProduct> = ({
  title,
  description,
  images,
  currentPrice,
  currency,
  attributes,
}) => {
  const [openDescription, setOpenDescription] = useState(false);
  const handleClickDescription = () => {
    setOpenDescription(!openDescription);
  };
  const isLoading = useAppSelector(selectLoading);

  return isLoading ? (
    <CircularProgress color="warning" />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {images.map(image => (
          <ProductImage {...image} key={image.label} />
        ))}
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid className={styles.item} sx={{ p: 2 }}>
          <Typography variant="h4" className={styles.title}>
            {title}
          </Typography>
          <div>
            {attributes.map(attribute => (
              <AttributeList {...attribute} key={attribute.name} />
            ))}
          </div>
          <div className={styles.priceContainer}>
            <p className={styles.price}>
              {currentPrice}
              {currency}
            </p>
          </div>
          <Button className={styles.button} variant="contained">
            Add to cart
            <ShoppingCartIcon />
          </Button>
        </Grid>
        <Grid item className={styles.list}>
          {description ? (
            <List
              sx={{ minWidth: '360px', width: '100%', bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader">
              <ListItemButton onClick={handleClickDescription}>
                <ListItemText primary="Description" />
                {openDescription ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openDescription} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemText sx={{ pl: 2, pr: 2 }} primary={description} />
                </List>
              </Collapse>
            </List>
          ) : (
            ''
          )}
          {attributes.map(attribute => (
            <AttributeCollapse {...attribute} key={attribute.name} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
