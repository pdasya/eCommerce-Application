import { Cart, CartUpdateAction } from '@commercetools/platform-sdk';
import { client } from '@config/constants';

let cart: Cart;
let cartId: string;
let cartVersion: number;

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  oldPrice?: number;
  quantity: number;
}

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
      sku: 'yamato-sauces-3_1',
      quantity: 1,
    },
    {
      action: 'addLineItem',
      sku: 'itoen-tea-1_1',
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

    // Добавляю товар после создания корзины
    cart = await addLineItemToCart(cartId, cartVersion);

    // Получаю активную корзину текущего пользователя
    cart = await getActiveCart();

    return cart; // Возвращаем активную корзину
  } catch (error) {
    console.error('Error in cart operations:', error);
    throw error;
  }
};

export const fetchCart = async () => {
  try {
    const userCart = await getUserCart();
    const items = userCart.lineItems.map(item => ({
      id: item.id,
      name: item.name.en,
      imageUrl: 'https://via.placeholder.com/150',
      price: item.price.value.centAmount / 100,
      quantity: item.quantity,
    }));
    return items;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const handleDelete = async (id: string) => {
  const updateActionDelete = [
    {
      action: 'removeLineItem',
      lineItemId: id,
    },
  ];

  try {
    const response = await client.getClient().me().activeCart().get().execute();
    const currentCartVersion = response.body.version;
    const currentCartId = response.body.id;

    const itemName =
      response.body.lineItems.find((item: { id: string }) => item.id === id)?.name?.en || 'Item';

    await client
      .getClient()
      .carts()
      .withId({ ID: currentCartId })
      .post({
        body: {
          version: currentCartVersion,
          actions: updateActionDelete as CartUpdateAction[],
        },
      })
      .execute();

    const cartResponse = await client.getClient().me().carts().get().execute();
    console.log(cartResponse.body.results);
    return itemName;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const handleQuantityChange = async (id: string, newQuantity: number) => {
  const updateQuantityAction = [
    {
      action: 'changeLineItemQuantity',
      lineItemId: id,
      quantity: newQuantity,
    },
  ];

  try {
    const response = await client.getClient().me().activeCart().get().execute();
    const currentCartVersion = response.body.version;
    const currentCartId = response.body.id;

    const itemName =
      response.body.lineItems.find((item: { id: string }) => item.id === id)?.name?.en || 'Item';

    await client
      .getClient()
      .carts()
      .withId({ ID: currentCartId })
      .post({
        body: {
          version: currentCartVersion,
          actions: updateQuantityAction as CartUpdateAction[],
        },
      })
      .execute();

    const responseCheck = await client.getClient().me().activeCart().get().execute();
    console.log(responseCheck.body);
    return itemName;
  } catch (error) {
    console.error(`Error updating quantity: ${error}`);
    throw error;
  }
};

export const handlePromoCodeApply = async (promoCode: string, VALID_PROMO_CODES: string[]) => {
  if (!VALID_PROMO_CODES.includes(promoCode)) {
    throw new Error('Invalid promo code');
  }

  const updatePromoCodeActions = [
    {
      action: 'addDiscountCode',
      code: promoCode,
    },
  ];

  try {
    const response = await client.getClient().me().activeCart().get().execute();
    const currentCartVersion = response.body.version;
    const currentCartId = response.body.id;

    await client
      .getClient()
      .carts()
      .withId({ ID: currentCartId })
      .post({
        body: {
          version: currentCartVersion,
          actions: updatePromoCodeActions as CartUpdateAction[],
        },
      })
      .execute();

    const cartResponse = await client.getClient().me().activeCart().get().execute();

    const items = cartResponse.body.lineItems.map(item => {
      const discountedPrice = item.price.discounted?.value.centAmount;
      const regularPrice = item.price.value.centAmount;

      return {
        id: item.id,
        name: item.name.en,
        imageUrl: 'https://via.placeholder.com/150',
        price: discountedPrice ? discountedPrice / 100 : regularPrice / 100,
        oldPrice: discountedPrice ? regularPrice / 100 : undefined,
        quantity: item.quantity,
      };
    });
    return items;
  } catch (error) {
    console.error('Error applying promo code:', error);
    throw error;
  }
};

export const handleCartClear = async (cartItems: CartItem[]) => {
  const clearCartActions = cartItems.map(item => ({
    action: 'removeLineItem',
    lineItemId: item.id,
  }));

  try {
    const response = await client.getClient().me().activeCart().get().execute();
    const currentCartVersion = response.body.version;
    const currentCartId = response.body.id;

    await client
      .getClient()
      .carts()
      .withId({ ID: currentCartId })
      .post({
        body: {
          version: currentCartVersion,
          actions: clearCartActions as CartUpdateAction[],
        },
      })
      .execute();

    const responseCheck = await client.getClient().me().activeCart().get().execute();
    console.log(responseCheck.body);
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

export const getTotalPrice = async () => {
  try {
    const response = await client.getClient().me().activeCart().get().execute();
    const discount = response.body.discountOnTotalPrice?.discountedAmount.centAmount || 0;
    const totalPrice = response.body.totalPrice.centAmount;
    const oldTotalPrice = totalPrice + discount;

    return { totalPrice, oldTotalPrice };
  } catch (error) {
    console.error(`Error getting total cost: ${error}`);
    return error;
  }
};
