import { updateCartEndpoint } from './update-cart.endpoint';

type Options = {
  id: string;
  version: number;
  promoCodeId: string;
};

export const removePromoCodeEndpoint = ({ id, version, promoCodeId }: Options) =>
  updateCartEndpoint({
    id,
    version,
    actions: [
      {
        action: 'removeDiscountCode',
        discountCode: {
          typeId: 'discount-code',
          id: promoCodeId,
        },
      },
    ],
  });
