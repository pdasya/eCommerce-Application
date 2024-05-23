import React, { FC } from 'react';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { useMountEffect } from '@hooks/use-mount-effect.hook';
import { ProductList } from '@modules/product-list';
import { update } from '@store/catalog/catalog.slice';
import { IProduct } from '@/interfaces/interfaces';
import styles from './catalog.page.module.scss';

const mockProducts: IProduct[] = [
  {
    id: '1',
    imageSrc: 'https://dummyimage.com/600x400/e38526/fff&text=Product+image',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    currentPrice: 1.5,
    currency: '$',
    discountPrice: 0.9,
  },
  {
    id: '2',
    imageSrc: 'https://dummyimage.com/600x800/e38526/fff&text=Product+image',
    title: 'Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    currentPrice: 1.5,
    currency: '$',
  },
  {
    id: '3',
    imageSrc: 'https://dummyimage.com/600x100/e38526/fff&text=Product+image',
    title: 'Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    currentPrice: 1.5,
    currency: '$',
  },
  {
    id: '4',
    imageSrc: 'https://dummyimage.com/600x400/e38526/fff&text=Product+image',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    currentPrice: 1.5,
    currency: '$',
  },
  {
    id: '5',
    imageSrc: 'https://dummyimage.com/600x800/e38526/fff&text=Product+image',
    title: 'Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    currentPrice: 1.5,
    currency: '$',
  },
  {
    id: '6',
    imageSrc: 'https://dummyimage.com/600x100/e38526/fff&text=Product+image',
    title: 'Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    currentPrice: 1.5,
    currency: '$',
  },
  {
    id: '7',
    imageSrc: 'https://dummyimage.com/600x400/e38526/fff&text=Product+image',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consequuntur voluptatum at, maxime similique, temporibus perferendis accusantium numquam vitae maiores molestiae amet dolores odit, illum eveniet quidem optio consectetur. Nulla!',
    currentPrice: 1.5,
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
