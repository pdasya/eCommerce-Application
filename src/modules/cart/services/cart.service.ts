import { store } from '@store/index';
import {
  addCartItemsEndpoint,
  createMyCartEndpoint,
  deleteCartEndpoint,
  getMyActiveCartEndpoint,
  updateCartItemsQuantityEndpoint,
} from '@modules/cart/api';
import { resetCart, updateCart } from '@store/cart/cart.slice';
import { removeCartItemsEndpoint } from '@modules/cart/api/endpoints/remove-cart-items.endpoint';
import { applyPromoCodeEndpoint } from '@modules/cart/api/endpoints/apply-promo-code.endpoint';
import { ICartItem } from '@modules/cart/interfaces/cart-item.interface';

class CartService {
  /**
   * Fetches active cart and update store.
   * New cart will be created if not exists.
   * May be used on first render or flow change.
   */
  public async synchronize() {
    store.dispatch(resetCart());
    const cart = await this._getMyActiveCart();
    store.dispatch(updateCart(cart));
  }

  /**
   * Add item to cart. Create cart (if not exists).
   */
  public async addCartItem(items: { sku: string; quantity?: number }[]) {
    const { id, version } = await this._getMyActiveCart();
    const cart = await addCartItemsEndpoint({ id, version, items });
    store.dispatch(updateCart(cart));
  }

  /**
   * Updates cart items quantity.
   */
  public async updateCartItemQuantity(items: { id: string; quantity: number }[]) {
    const { id, version } = await this._getMyActiveCart();
    const cart = await updateCartItemsQuantityEndpoint({ id, version, items });
    store.dispatch(updateCart(cart));
  }

  /**
   * Removes item from cart.
   */
  public async removeCartItem(item: ICartItem) {
    const { id, version } = await this._getMyActiveCart();
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
   */
  public async applyPromoCode(promoCode: string) {
    const { id, version } = await this._getMyActiveCart();
    const cart = await applyPromoCodeEndpoint({ id, version, promoCode });
    store.dispatch(updateCart(cart));
  }

  /**
   * Return active cart. Create cart (if not exists).
   */
  private async _getMyActiveCart() {
    const cart = await getMyActiveCartEndpoint();

    if (!cart) {
      return createMyCartEndpoint();
    }

    return cart;
  }
}

export const cartService = new CartService();
