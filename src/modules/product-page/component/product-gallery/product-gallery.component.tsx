import React, { FC, useState } from 'react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Image } from '@commercetools/platform-sdk';
import { ProductImages } from '../product-images/product-images';
import 'swiper/swiper-bundle.css';
import styles from './product-gallery.component.module.scss';

type SwiperGalleryType = {
  images: Image[];
};

export const SwiperGallery: FC<SwiperGalleryType> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <>
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
    </>
  );
};
