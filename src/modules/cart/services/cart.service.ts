import { store } from '@store/index';
import {
  addCartItemsEndpoint,
  createMyCartEndpoint,
  deleteCartEndpoint,
  getDiscountCodeNameEndpoint,
  getMyActiveCartEndpoint,
  updateCartItemsQuantityEndpoint,
} from '@modules/cart/api';
import { resetCart, updateCart } from '@store/cart/cart.slice';
import { removeCartItemsEndpoint } from '@modules/cart/api/endpoints/remove-cart-items.endpoint';
import { applyPromoCodeEndpoint } from '@modules/cart/api/endpoints/apply-promo-code.endpoint';
import { ICartItem } from '@modules/cart/interfaces/cart-item.interface';

class CartService {
  /**
   * Fetches active cart (if exists) and update store.
   */
  public async synchronize() {
    store.dispatch(resetCart());
    const cart = await this._getMyActiveCart();

    if (cart) {
      store.dispatch(updateCart(cart));
    } else {
      store.dispatch(resetCart());
    }
  }

  /**
   * Add item to cart. Create cart (if not exists).
   */
  public async addCartItem(items: { sku: string; quantity?: number }[]) {
    const { id, version } = await this._getMyActiveCartOrCreate();
    const cart = await addCartItemsEndpoint({ id, version, items });
    store.dispatch(updateCart(cart));
  }

  /**
   * Updates cart items quantity.
   */
  public async updateCartItemQuantity(items: { id: string; quantity: number }[]) {
    const { id, version } = await this._getMyActiveCartOrCreate();
    const cart = await updateCartItemsQuantityEndpoint({ id, version, items });
    store.dispatch(updateCart(cart));
  }

  /**
   * Removes item from cart (if cart exists).
   * Cart will be created if not exists.
   */
  public async removeCartItem(item: ICartItem) {
    const { id, version } = await this._getMyActiveCartOrCreate();
    const cart = await removeCartItemsEndpoint({ id, version, items: [item] });
    store.dispatch(updateCart(cart));
  }

  /**
   * Delete active cart (if exists).
   */
  public async deleteCart() {
    const cart = await getMyActiveCartEndpoint();

    if (cart) {
      await deleteCartEndpoint(cart);
    }

    store.dispatch(resetCart());
  }

  /**
   * Applies promo code to cart.
   * Cart will be created if not exists.
   */
  public async applyPromoCode(promoCode: string) {
    const { id, version } = await this._getMyActiveCartOrCreate();
    const cart = await applyPromoCodeEndpoint({ id, version, promoCode });
    store.dispatch(updateCart(cart));
  }

  /**
   * Return promo code name.
   */
  public async getPromoCodeName() {
    const { discountCodeId } = await this._getMyActiveCartOrCreate();
    const promoName = await getDiscountCodeNameEndpoint(discountCodeId);
    return promoName;
  }

  /**
   * Return active cart (if exists).
   */
  private async _getMyActiveCart() {
    const cart = await getMyActiveCartEndpoint();
    return cart;
  }

  /**
   * Return active cart or create it (if not exists).
   */
  private async _getMyActiveCartOrCreate() {
    const cart = await getMyActiveCartEndpoint();

    if (!cart) {
      return createMyCartEndpoint();
    }

    return cart;
  }
}

export const cartService = new CartService();
