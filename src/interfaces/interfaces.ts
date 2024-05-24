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
