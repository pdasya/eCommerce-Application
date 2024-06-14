import { ICartItem } from './cart-item.interface';

export interface ICart {
  id: string;
  version: number;
  items: ICartItem[];
  currency: string;
  initialPrice: number;
  discount: number;
  finalPrice: number;
}
