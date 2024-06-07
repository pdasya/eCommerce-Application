import SaveStorage from '@utils/save-storage';
import BuildClient from '@/commercetools/build-client';
import TokenCacheUtil from '@/utils/token-cache';

export const projectKey = process.env.CTP_PROJECT_KEY as string;
export const clientSecret = process.env.CTP_CLIENT_SECRET as string;
export const clientId = process.env.CTP_CLIENT_ID as string;
export const authUrl = process.env.CTP_AUTH_URL as string;
export const apiUrl = process.env.CTP_API_URL as string;
export const scopes = process.env.CTP_SCOPES as string;
export const storeKey = process.env.STORE_KEY as string;

export const minPasswordLength = 8;

export const tokenCache = new TokenCacheUtil();
export const saveStorage = new SaveStorage(localStorage);
export const client = new BuildClient(projectKey, clientId, clientSecret, authUrl, apiUrl, [
  scopes,
]);
export const tokenName = 'authorize_token';

export const defaultRequestPageSize = 20;
export const catalogDefaultCategorySlug = 'all';
