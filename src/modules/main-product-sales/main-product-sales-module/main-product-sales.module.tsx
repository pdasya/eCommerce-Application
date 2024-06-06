import React, { FC, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { LoadingBanner } from '@modules/product-list/components/loading-banner/loading-banner.component';
import { ProductCard } from '@modules/product-list/components/product-card/product-card.component';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { loadEnd, loading } from '@store/misc/misc.slice';
import { toast } from 'react-toastify';
import {
  productsSaleUpdating,
  productsSaleUpdatingEnd,
  isProductsSaleUpdating,
  productsSale,
  update,
} from '@store/sale/sale.slice';
import { client } from '@config/constants';
import { NotFoundBanner } from '@modules/product-list/components/not-found-banner/not-found-banner.component';
import { Navigation } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import classNames from 'classnames';
import { getProductsList } from '@/API/products/products-adapter';
import styles from './main-product-sales.module.scss';
import 'swiper/swiper-bundle.css';

export const MainGoodsSale: FC = () => {
  const products = useAppSelector(productsSale);
  const isUpdating = useAppSelector(isProductsSaleUpdating);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loading({}));
    dispatch(productsSaleUpdating());
    client
      .getClient()
      .productDiscounts()
      .get({ queryArgs: { where: 'isActive=true' } })
      .execute()
      .then(response => {
        const discounts = response.body.results;
        const discountProducts = discounts
          .map(discount => discount.predicate.split('or'))
          .flat()
          .map(predicate => predicate.match(/"(.*)"/)?.slice(1))
          .flat()
          .map(sku => `"${sku}"`);

        getProductsList({
          filter: [`variants.sku:${discountProducts}`],
        })
          .then(productsList => {
            dispatch(update(productsList));
          })
          .catch(error => toast.error(error))
          .finally(() => {
            dispatch(loadEnd({}));
            dispatch(productsSaleUpdatingEnd());
          });
      })
      .catch(error => toast.error(error));
  }, []);

  return (
    <Grid container flexDirection="column" flexWrap="nowrap" spacing={2} sx={{ mt: 2 }}>
      <Grid item className={styles.saleItem}>
        <div className={styles.saleContainer}>
          <Typography
            variant="h5"
            component="h5"
            sx={{ mt: 3, mb: 3, ml: 2 }}
            className={styles.saleTitle}>
            Products on sale
          </Typography>
          <div className={styles.sliderNav}>
            {isUpdating ? (
              <CircularProgress color="primary" />
            ) : products.length ? (
              <>
                <IconButton
                  className={classNames('slide-prev', styles.sliderNavButton)}
                  color="primary"
                  aria-label="slide-prev">
                  <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton
                  className={classNames('slide-next', styles.sliderNavButton)}
                  color="primary"
                  aria-label="slide-next">
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </Grid>
      <Grid item className={styles.saleItem}>
        {isUpdating ? (
          <LoadingBanner />
        ) : products.length ? (
          <Swiper
            className={styles.sliderContainer}
            navigation={{ nextEl: '.slide-next', prevEl: '.slide-prev' }}
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            slidesPerGroup={1}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              360: {
                slidesPerView: 1,
              },
              500: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 5,
              },
            }}>
            {products.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <NotFoundBanner />
        )}
      </Grid>
    </Grid>
  );
};
