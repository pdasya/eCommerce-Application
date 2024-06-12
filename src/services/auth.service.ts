import { store } from '@store/index';
import { authorize, unauthorize } from '@store/auth/auth.slice';
import { ClientResponse, Customer, CustomerDraft } from '@commercetools/platform-sdk';
import { authEnd, authPending } from '@store/misc/misc.slice';
import { apiFlowManager } from '@config/constants';
import { ApiFlowManager } from './api-flow-manager.class';
import { IUserDraft } from '@/interfaces/user-draft.interface';

class AuthService {
  constructor(private _apiFlowManager: ApiFlowManager) {
    this._init();
  }

  private async _init() {
    if (!this._apiFlowManager.isAuthorizedFlow) {
      store.dispatch(unauthorize({}));
      store.dispatch(authEnd({}));
      return;
    }

    store.dispatch(authPending({}));

    const response = await this.getUserInfo();

    store.dispatch(
      authorize({
        id: response.body.id,
        email: response.body.email,
      }),
    );

    store.dispatch(authEnd({}));
  }

  public async getUserInfo(): Promise<ClientResponse<Customer>> {
    return this._apiFlowManager.getClient().me().get().execute();
  }

  public async signIn(data: IUserDraft): Promise<void> {
    const response = await this._apiFlowManager
      .switchPasswordFlow(data)
      .getClient()
      .me()
      .login()
      .post({
        body: data,
      })
      .execute();

    store.dispatch(
      authorize({
        id: response.body.customer.id,
        email: response.body.customer.email,
      }),
    );
  }

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

  public logout() {
    this._apiFlowManager.switchAnonymousFlow();
    store.dispatch(unauthorize({}));
  }
}

export const authService = new AuthService(apiFlowManager);
