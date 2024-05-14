import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class TokenCacheUtil implements TokenCache {
  defaultCacheOptions = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  caсhe: TokenStore = this.defaultCacheOptions;

  set(newCache: TokenStore) {
    this.caсhe = newCache;
  }

  get() {
    return this.caсhe;
  }

  delete() {
    this.caсhe = this.defaultCacheOptions;
  }
}
