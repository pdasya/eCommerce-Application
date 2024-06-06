import React, { FC, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from '@mui/material';
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
import { getProductsList } from '@/API/products/products-adapter';
import 'swiper/css/bundle';

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
    <Grid>
      <Swiper spaceBetween={20} slidesPerView={4}>
        {isUpdating ? (
          <LoadingBanner />
        ) : products.length ? (
          products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))
        ) : (
          ''
        )}
      </Swiper>
    </Grid>
  );
};
