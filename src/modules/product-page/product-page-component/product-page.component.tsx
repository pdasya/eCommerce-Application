import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Collapse, Grid } from '@mui/material';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { ISingleProduct } from '@/interfaces/interfaces';
import { AttributeList } from '../component/product-attribute-list/product-attribute-list';
import { AttributeCollapse } from '../component/product-attribute-collapse/product-attribute-collapse';
import { ProductImages } from '../component/product-images/product-images';
import 'swiper/swiper-bundle.css';
import styles from './product-page.component.module.scss';

export const ProductItem: FC<ISingleProduct> = ({
  title,
  description,
  images,
  currentPrice,
  currency,
  attributes,
  discountPrice,
}) => {
  const [openDescription, setOpenDescription] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const handleClickDescription = () => {
    setOpenDescription(!openDescription);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Thumbs,
          ]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{
            clickable: true,
          }}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            slideThumbActiveClass: styles.thumbActive,
          }}>
          {images.map(image => (
            <SwiperSlide key={image.label} className={styles.slide}>
              <ProductImages {...image} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Thumbs,
          ]}
          spaceBetween={10}
          slidesPerView={3}
          navigation
          onSwiper={setThumbsSwiper}
          style={{ marginTop: 10 }}>
          {images.map(image => (
            <SwiperSlide key={image.label} className={styles.slide}>
              <div className={styles.thumb}>
                <ProductImages {...image} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
            <p className={classNames(styles.price, discountPrice ? styles.priceInactive : '')}>
              {currentPrice}
              {currency}
            </p>
            {discountPrice ? (
              <p className={styles.priceDiscount}>
                {discountPrice}
                {currency}
              </p>
            ) : (
              ''
            )}
          </div>
          <Button className={styles.button} variant="contained">
            Add to cart
            <ShoppingCartIcon />
          </Button>
        </Grid>
        <Grid item className={styles.list}>
          {description ? (
            <List
              sx={{ bgcolor: 'background.paper' }}
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