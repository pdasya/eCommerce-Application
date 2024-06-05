import { Cart, CartUpdateAction } from '@commercetools/platform-sdk';
import { client } from '@config/constants';

let cart: Cart;
let cartId: string;
let cartVersion: number;

const createCart = async (): Promise<Cart> => {
  const customerId = (await client.getClient().me().get().execute()).body.id;
  try {
    const response = await client
      .getClient()
      .carts()
      .post({
        body: {
          currency: 'USD',
          country: 'US',
          customerId,
        },
      })
      .execute();
    return response.body as Cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};

const addLineItemToCart = async (
  currentCartId: string,
  currentCartVersion: number,
): Promise<Cart> => {
  const updateActions: CartUpdateAction[] = [
    {
      action: 'addLineItem',
      sku: 'itoen-tea-1_1',
      quantity: 1,
    },
    {
      action: 'addLineItem',
      sku: 'itoen-tea-5_1',
      quantity: 1,
    },
    {
      action: 'addLineItem',
      sku: 'itoen-tea-4_1',
      quantity: 1,
    },
    {
      action: 'addLineItem',
      sku: 'itoen-tea-3_1',
      quantity: 1,
    },
  ];

  try {
    const response = await client
      .getClient()
      .carts()
      .withId({ ID: currentCartId })
      .post({
        body: {
          version: currentCartVersion,
          actions: updateActions,
        },
      })
      .execute();
    return response.body as Cart;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const getActiveCart = async (): Promise<Cart> => {
  try {
    const response = await client.getClient().me().carts().get().execute();
    console.log(response.body.results);
    const activeCart = response.body.results.sort(
      (a, b) => new Date(b.lastModifiedAt).getTime() - new Date(a.lastModifiedAt).getTime(),
    )[0];
    return activeCart as Cart;
  } catch (error) {
    console.error('Error retrieving active cart:', error);
    throw error;
  }
};

export const getUserCart = async (): Promise<Cart> => {
  try {
    // Создаю корзину
    cart = await createCart();
    cartId = cart.id;
    cartVersion = cart.version;
    console.log('Cart created:', cartId, cartVersion);

    // Добавляю товар после создания корзины
    cart = await addLineItemToCart(cartId, cartVersion);
    console.log('Cart updated:', cart);

    // Получаю активную корзину текущего пользователя
    cart = await getActiveCart();
    console.log('Active cart retrieved:', cart);

    return cart; // Возвращаем активную корзину
  } catch (error) {
    console.error('Error in cart operations:', error);
    throw error;
  }
};
