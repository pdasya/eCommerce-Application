import React, { FC, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ISingleProduct } from '@/interfaces/interfaces';
import { AttributeList } from '../component/product-attribute-list';
import { AttributeCollapse } from '../component/product-attribute-collapse';
import { ProductImage } from '../component/product-images';

export const ProductItem: FC<ISingleProduct> = ({
  title,
  description,
  images,
  currentPrice,
  currency,
  discountPrice,
  attributes,
}) => {
  const [openDescription, setOpenDescription] = useState(false);
  const handleClickDescription = () => {
    setOpenDescription(!openDescription);
  };

  return (
    <Grid container>
      <Grid xs={6} md={8}>
        {images.map(image => (
          <ProductImage {...image} />
        ))}
      </Grid>
      <Grid xs={6} md={8}>
        <Typography variant="h4">{title}</Typography>
        <div>
          {attributes.map(attribute => (
            <AttributeList {...attribute} />
          ))}
        </div>
        <div>
          <p>
            {currentPrice}
            {currency}
          </p>
          {discountPrice ? (
            <p>
              {discountPrice}
              {currency}
            </p>
          ) : (
            ''
          )}
        </div>
        <Button variant="contained">
          Add to cart
          <ShoppingCartIcon />
        </Button>
        <div>
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
            <AttributeCollapse {...attribute} />
          ))}
        </div>
      </Grid>
    </Grid>
  );
};
