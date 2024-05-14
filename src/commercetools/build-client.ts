import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  projectKey,
  clientSecret,
  clientId,
  authUrl,
  apiUrl,
  scopes,
  tokenCache,
} from '../config/constants';

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes: [scopes],
  tokenCache,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiUrl,
};

export const client = new ClientBuilder()
  .defaultClient(authUrl, { clientId, clientSecret })
  .withLoggerMiddleware()
  .build();

export const client2 = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
