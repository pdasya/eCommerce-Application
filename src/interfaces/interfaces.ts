export interface IProduct {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  currentPrice: number;
  currency: string;
  discountPrice?: number;
  slug: string;
}

export interface ISingleProduct extends Omit<IProduct, 'slug'> {
  weight: string;
  ingredients?: string;
  nutrition?: string;
  further?: string;
  maker: string;
}
