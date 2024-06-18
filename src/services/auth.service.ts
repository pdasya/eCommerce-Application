import { store } from '@store/index';
import { authorize, unauthorize } from '@store/auth/auth.slice';
import { CartResourceIdentifier, CustomerDraft } from '@commercetools/platform-sdk';
import { authEnd, authPending } from '@store/misc/misc.slice';
import { apiFlowManager } from '@config/constants';
import { resetCart } from '@store/cart/cart.slice';
import { ApiFlowManager } from './api-flow-manager.class';
import { IUserDraft } from '@/interfaces/user-draft.interface';
import { ICustomer } from '@/interfaces/customer.interface';
import { getAuthorizedCustomer } from '@/API/customer/get-authorized-customer.request';

class AuthService {
  constructor(private _apiFlowManager: ApiFlowManager) {}

  /**
   * Initial service configuration.
   */
  public async init() {
    if (!this._apiFlowManager.isAuthorizedFlow) {
      store.dispatch(unauthorize({}));
      store.dispatch(authEnd({}));
      return;
    }

    store.dispatch(authPending({}));

    const customer = await this.getCustomer();

    store.dispatch(authorize({ customer }));
    store.dispatch(authEnd({}));
  }

  /**
   * Returns current authorized customer parameters.
   */
  public async getCustomer(): Promise<ICustomer> {
    return getAuthorizedCustomer();
  }

  /**
   * Authorize customer via password flow.
   */
  public async signIn(data: IUserDraft): Promise<void> {
    const activeCart = store.getState().cart.cart;
    let anonymousCart: CartResourceIdentifier | undefined;

    if (activeCart.id) {
      anonymousCart = { id: activeCart.id, typeId: 'cart' };
    }

    // TODO: Issue #240: Refactor cart merging approach
    const response = await this._apiFlowManager
      .switchPasswordFlow(data)
      .getClient()
      // .me()
      .login()
      .post({
        body: { ...data, anonymousCart },
      })
      .execute();

    store.dispatch(
      authorize({
        id: response.body.customer.id,
        email: response.body.customer.email,
      }),
    );
  }

  /**
   * Register customer and sign-in.
   */
  public async signUp(data: CustomerDraft): Promise<void> {
    await this._apiFlowManager
      .switchAnonymousFlow()
      .getClient()
      .customers()
      .post({ body: data })
      .execute();

    if (!data.email && !data.password) {
      throw new Error('Invalid customer draft request data.');
    }

    await this.signIn(data as IUserDraft);
  }

  /**
   * Updates current customer password.
   */
  public async changePassword(data: { currentPassword: string; newPassword: string }) {
    const customer = await this.getCustomer();

    await this._apiFlowManager
      .getClient()
      .me()
      .password()
      .post({
        body: {
          version: customer.version,
          ...data,
        },
      })
      .execute();

    store.dispatch(resetCart());

    await this.signIn({ email: customer.email, password: data.newPassword });
  }

  /**
   * Logs-out locally (clear token storage), without network requests.
   */
  public logout() {
    this._apiFlowManager.switchAnonymousFlow();
    store.dispatch(unauthorize({}));
  }
}

export const authService = new AuthService(apiFlowManager);
