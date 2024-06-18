import { updateCartEndpoint } from './update-cart.endpoint';

type Options = {
  id: string;
  version: number;
  promoCode: string;
};

export const applyPromoCodeEndpoint = ({ id, version, promoCode }: Options) =>
  updateCartEndpoint({
    id,
    version,
    actions: [
      {
        action: 'addDiscountCode',
        code: promoCode,
      },
    ],
  });
