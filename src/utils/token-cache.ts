import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class TokenCacheUtil implements TokenCache {
  private defaultCacheOptions = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  private caсhe: TokenStore = this.defaultCacheOptions;

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
