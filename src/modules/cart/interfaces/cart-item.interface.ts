export interface ICartItem {
  id: string;
  sku: string;
  name: string;
  slug: string;
  imageUrl: string;
  quantity: number;
  initialPrice: number;
  finalPrice: number;
}
