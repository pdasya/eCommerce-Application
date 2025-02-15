import { Attribute, Image } from '@commercetools/platform-sdk';

export interface IProduct {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  currentPrice: string;
  currency: string;
  discountPrice?: string;
  slug: string;
  sku: string;
}

export interface ISingleProduct extends Omit<IProduct, 'slug' | 'imageSrc' | 'imageAlt'> {
  images: Image[];
  attributes: Attribute[];
}

export interface IProductList {
  products: IProduct[];
  totalCount: number;
}
