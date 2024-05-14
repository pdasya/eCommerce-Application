import TokenCacheUtil from '@/utils/token-cache';
import TokenStorage from '@/utils/token-storage';

export const projectKey = process.env.CTP_PROJECT_KEY;
export const clientSecret = process.env.CTP_CLIENT_SECRET;
export const clientId = process.env.CTP_CLIENT_ID;
export const authUrl = process.env.CTP_AUTH_URL;
export const apiUrl = process.env.CTP_API_URL;
export const scopes = process.env.CTP_SCOPES;

export const lineBreaker = 2;

export const minPasswordLength = 8;

export const tokenCache = new TokenCacheUtil();
export const tokenStorage = new TokenStorage(localStorage);
