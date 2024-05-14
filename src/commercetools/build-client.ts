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
import assertIsDefined from '../types/asserts';

assertIsDefined(projectKey);
assertIsDefined(clientSecret);
assertIsDefined(clientId);
assertIsDefined(authUrl);
assertIsDefined(apiUrl);
assertIsDefined(scopes);

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
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
