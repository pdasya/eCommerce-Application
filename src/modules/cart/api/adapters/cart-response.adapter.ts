import {
  Cart,
  CartPagedQueryResponse,
  ClientResponse,
  LineItem,
} from '@commercetools/platform-sdk';
import { ICart } from '../../interfaces/cart.interface';
import { ICartItem } from '../../interfaces/cart-item.interface';

const cartItemParser = ({ id, variant, name, quantity, price }: LineItem): ICartItem => {
  if (!variant.sku) {
    throw Error('Cart line item parse error: "sku" is not specified.');
  }

  return {
    id,
    sku: variant.sku,
    name: name.en,
    imageUrl: 'https://via.placeholder.com/150',
    quantity,
    initialPrice: price.value.centAmount / 100,
    finalPrice: (price.discounted?.value.centAmount || price.value.centAmount) / 100,
  };
};

const cartParser = (cart: Cart): ICart => {
  const { id, version, lineItems, totalPrice, discountOnTotalPrice, discountCodes } = cart;
  const finalPrice = totalPrice.centAmount / 100;
  const discount = (discountOnTotalPrice?.discountedAmount.centAmount || 0) / 100;
  const initialPrice = finalPrice + discount;
  const discountCodeId = discountCodes.length > 0 ? discountCodes[0].discountCode.id : '';

  return {
    id,
    version,
    items: lineItems.map(item => cartItemParser(item)),
    currency: totalPrice.currencyCode,
    initialPrice,
    discount,
    finalPrice,
    discountCodeId,
  };
};

export const cartResponseAdapter = (response: ClientResponse<Cart>): ICart =>
  cartParser(response.body);

export const cartPagedResponseAdapter = (
  response: ClientResponse<CartPagedQueryResponse>,
): ICart[] => response.body.results.map(cart => cartParser(cart));
