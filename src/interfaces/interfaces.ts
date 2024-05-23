export interface IProduct {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  currentPrice: number;
  currency: string;
  discountPrice?: number;
}
