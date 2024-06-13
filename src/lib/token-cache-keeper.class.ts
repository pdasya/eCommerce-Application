import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

const defaultTokenCache: TokenStore = {
  token: '',
  expirationTime: -1,
  refreshToken: '',
};

type Callback = ((value: TokenStore) => void) | null;

export class TokenCacheKeeper implements TokenCache {
  private _cache: TokenStore = defaultTokenCache;

  private _onChange: Callback = null;

  constructor(initialCache?: TokenStore) {
    if (initialCache) {
      this._cache = initialCache;
    }
  }

  public set(cache: TokenStore): void {
    this._cache = cache;

    if (this._onChange) {
      this._onChange(this._cache);
    }
  }

  public get(): TokenStore {
    return this._cache;
  }

  public reset(): void {
    this._cache = defaultTokenCache;

    if (this._onChange) {
      this._onChange(this._cache);
    }
  }

  public set onChange(callback: Callback) {
    this._onChange = callback;
  }
}
