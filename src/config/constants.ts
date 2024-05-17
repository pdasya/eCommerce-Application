import BuildClient from '@/commercetools/build-client';
import TokenCacheUtil from '@/utils/token-cache';
import TokenStorage from '@/utils/token-storage';

export const projectKey = process.env.CTP_PROJECT_KEY as string;
export const clientSecret = process.env.CTP_CLIENT_SECRET as string;
export const clientId = process.env.CTP_CLIENT_ID as string;
export const authUrl = process.env.CTP_AUTH_URL as string;
export const apiUrl = process.env.CTP_API_URL as string;
export const scopes = process.env.CTP_SCOPES as string;
export const storeKey = process.env.STORE_KEY as string;

export const minPasswordLength = 8;

export const tokenCache = new TokenCacheUtil();
export const tokenStorage = new TokenStorage(localStorage);
export const client = new BuildClient(projectKey, clientId, clientSecret, authUrl, apiUrl, [
  scopes,
]);
