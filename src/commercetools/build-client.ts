import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { tokenCache, tokenName, tokenStorage } from '@/config/constants';
import { IUserDraft } from '@/modules/sign-in-form/interfaces/sign-in-form.interfaces';

export default class BuildClient {
  private projectKey: string;

  private clientId: string;

  private clientSecret: string;

  private authUrl: string;

  private apiUrl: string;

  private scopes: string[];

  private httpMiddlewareOptions: HttpMiddlewareOptions;

  private client: ByProjectKeyRequestBuilder;

  constructor(
    projectKey: string,
    clientId: string,
    clientSecret: string,
    authUrl: string,
    apiUrl: string,
    scopes: string[],
  ) {
    this.projectKey = projectKey;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.authUrl = authUrl;
    this.apiUrl = apiUrl;
    this.scopes = scopes;
    this.httpMiddlewareOptions = {
      host: this.apiUrl,
    };
    this.client = this.setFlow();
  }

  private setFlow() {
    const token = tokenStorage.get(tokenName);
    if (token) {
      return this.refreshToken(token.refreshToken);
    }
    return this.anonymousSession();
  }

  public anonymousSession() {
    const options: AnonymousAuthMiddlewareOptions = {
      host: this.authUrl,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
      scopes: this.scopes,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withAnonymousSessionFlow(options)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .build();

    this.client = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: this.projectKey,
    });
    return this.client;
  }

  public passwordSession(userDraft: IUserDraft) {
    const options: PasswordAuthMiddlewareOptions = {
      host: this.authUrl,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        user: {
          username: userDraft.email,
          password: userDraft.password,
        },
      },
      scopes: this.scopes,
      tokenCache,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withPasswordFlow(options)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .build();

    this.client = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: this.projectKey,
    });
    return this.client;
  }

  public refreshToken(refreshToken: string) {
    const options: RefreshAuthMiddlewareOptions = {
      host: this.authUrl,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
      refreshToken,
      tokenCache,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withRefreshTokenFlow(options)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .build();
    this.client = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: this.projectKey,
    });
    return this.client;
  }

  public getClient() {
    return this.client;
  }
}
