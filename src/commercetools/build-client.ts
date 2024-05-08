import axios from 'axios';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { projectKey, clientSecret, clientId, authUrl, apiUrl, scopes } from '../config/constants';
import assertIsDefined from '../types/asserts';

assertIsDefined(projectKey);
assertIsDefined(clientSecret);
assertIsDefined(clientId);
assertIsDefined(authUrl);
assertIsDefined(apiUrl);
assertIsDefined(scopes);

const authMiddlewareOptions = {
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes: [scopes],
  axios,
};

const httpMiddlewareOptions = {
  host: apiUrl,
  axios,
};

export const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
