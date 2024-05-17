import { TokenStore } from '@commercetools/sdk-client-v2';

export default class TokenStorage {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  public get(item: string) {
    const storageItem = this.storage.getItem(item);
    return storageItem ? JSON.parse(storageItem) : null;
  }

  public set(key: string, value: TokenStore) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public removeItem(item: string) {
    this.storage.removeItem(item);
  }

  public clear() {
    this.storage.clear();
  }
}
