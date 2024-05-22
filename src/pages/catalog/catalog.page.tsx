import React, { FC } from 'react';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { useMountEffect } from '@hooks/use-mount-effect.hook';
import { ProductList } from '@modules/product-list';
import { IProduct } from '@modules/product-list/interfaces/product.interface';
import { update } from '@store/catalog/catalog.slice';
import styles from './catalog.page.module.scss';

const mockProducts: IProduct[] = [
  {
    imageSrc: 'https://dummyimage.com/600x400/e38526/fff&text=Product+image',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    price: 1.5,
    currency: '$',
    discountPrice: 0.9,
  },
  {
    imageSrc: 'https://dummyimage.com/600x800/e38526/fff&text=Product+image',
    title: 'Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    price: 1.5,
    currency: '$',
  },
  {
    imageSrc: 'https://dummyimage.com/600x100/e38526/fff&text=Product+image',
    title: 'Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    price: 1.5,
    currency: '$',
  },
  {
    imageSrc: 'https://dummyimage.com/600x400/e38526/fff&text=Product+image',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    price: 1.5,
    currency: '$',
  },
  {
    imageSrc: 'https://dummyimage.com/600x800/e38526/fff&text=Product+image',
    title: 'Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    price: 1.5,
    currency: '$',
  },
  {
    imageSrc: 'https://dummyimage.com/600x100/e38526/fff&text=Product+image',
    title: 'Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    price: 1.5,
    currency: '$',
  },
  {
    imageSrc: 'https://dummyimage.com/600x400/e38526/fff&text=Product+image',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    price: 1.5,
    currency: '$',
  },
];

export const CatalogPage: FC = () => {
  const dispatch = useAppDispatch();

  useMountEffect(() => {
    dispatch(update(mockProducts));
  });

  return (
    <div className={styles.page}>
      <ProductList />
    </div>
  );
};
