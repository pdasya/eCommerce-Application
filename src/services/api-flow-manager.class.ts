import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { IPasswordFlowUserDraft } from '../commercetools/interfaces/interfaces';
import { IClientSideStorage } from '@/interfaces/client-side-storage.interface';
import { TokenCacheKeeper } from '@/lib/token-cache-keeper.class';

type ClientSideStorageMap = {
  anonymousToken: TokenStore;
  authorizedToken: TokenStore;
};

export class ApiFlowManager {
  private _httpMiddlewareOptions: HttpMiddlewareOptions;

  private _client: ByProjectKeyRequestBuilder;

  private _anonymousTokenKeeper?: TokenCacheKeeper;

  private _authorizedTokenKeeper?: TokenCacheKeeper;

  private _isAuthorizedFlow = false;

  constructor(
    private _projectKey: string,
    private _clientId: string,
    private _clientSecret: string,
    private _authUrl: string,
    private _apiUrl: string,
    private _scopes: string[],
    private _clientSideStorage: IClientSideStorage<ClientSideStorageMap>,
  ) {
    this._httpMiddlewareOptions = {
      host: this._apiUrl,
    };

    this._client = this._init();
  }

  private _init(): ByProjectKeyRequestBuilder {
    // Extract locally stored authorized token (if exists) and configure its token keeper
    const existingAuthorizedToken = this._clientSideStorage.get('authorizedToken');
    this._authorizedTokenKeeper = new TokenCacheKeeper(existingAuthorizedToken);
    this._authorizedTokenKeeper.onChange = token => {
      this._clientSideStorage.set('authorizedToken', token);
    };

    // Extract locally stored anonymous token (if exists) and configure its token keeper
    const existingAnonymousToken = this._clientSideStorage.get('anonymousToken');
    this._anonymousTokenKeeper = new TokenCacheKeeper(existingAnonymousToken);
    this._anonymousTokenKeeper.onChange = token => {
      this._clientSideStorage.set('anonymousToken', token);
    };

    // Setup initial flow
    if (existingAuthorizedToken?.refreshToken) {
      this.switchRefreshTokenFlow(existingAuthorizedToken.refreshToken);
    } else {
      this.switchAnonymousFlow();
    }

    return this._client;
  }

  public switchAnonymousFlow(): this {
    this._authorizedTokenKeeper?.reset();
    this._isAuthorizedFlow = false;

    const options: AnonymousAuthMiddlewareOptions = {
      host: this._authUrl,
      projectKey: this._projectKey,
      credentials: {
        clientId: this._clientId,
        clientSecret: this._clientSecret,
      },
      scopes: this._scopes,
      tokenCache: this._anonymousTokenKeeper,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(this._projectKey)
      .withAnonymousSessionFlow(options)
      .withHttpMiddleware(this._httpMiddlewareOptions)
      .build();

    this._client = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: this._projectKey,
    });

    return this;
  }

  public switchPasswordFlow(userDraft: IPasswordFlowUserDraft): this {
    this._anonymousTokenKeeper?.reset();
    this._isAuthorizedFlow = true;

    const options: PasswordAuthMiddlewareOptions = {
      host: this._authUrl,
      projectKey: this._projectKey,
      credentials: {
        clientId: this._clientId,
        clientSecret: this._clientSecret,
        user: {
          username: userDraft.email,
          password: userDraft.password,
        },
      },
      scopes: this._scopes,
      tokenCache: this._authorizedTokenKeeper,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(this._projectKey)
      .withPasswordFlow(options)
      .withHttpMiddleware(this._httpMiddlewareOptions)
      .build();

    this._client = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: this._projectKey,
    });
    return this;
  }

  public switchRefreshTokenFlow(refreshToken: string): this {
    this._isAuthorizedFlow = true;

    const options: RefreshAuthMiddlewareOptions = {
      host: this._authUrl,
      projectKey: this._projectKey,
      credentials: {
        clientId: this._clientId,
        clientSecret: this._clientSecret,
      },
      refreshToken,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(this._projectKey)
      .withRefreshTokenFlow(options)
      .withHttpMiddleware(this._httpMiddlewareOptions)
      .build();
    this._client = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: this._projectKey,
    });
    return this;
  }

  public getClient() {
    if (this._client === null) {
      throw new Error('Flow manager: flow not specified.');
    }
    return this._client;
  }

  public get isAuthorizedFlow(): boolean {
    return this._isAuthorizedFlow;
  }
}
