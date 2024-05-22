export interface IProduct {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  price: number;
  currency: string;
  discountPrice?: number;
}
