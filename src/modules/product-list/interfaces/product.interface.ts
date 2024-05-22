export interface IProduct {
  title: string;
  description: string;
  imageSrc: string;
  price: number;
  currency: string;
  discountPrice?: number;
}
