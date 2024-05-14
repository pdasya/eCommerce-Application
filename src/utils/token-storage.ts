import { TokenStore } from '@commercetools/sdk-client-v2';

export default class TokenStorage {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  get(item: string) {
    const storageItem = this.storage.getItem(item);
    return storageItem ? JSON.parse(storageItem) : '';
  }

  set(key: string, value: TokenStore) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(item: string) {
    this.storage.removeItem(item);
  }

  clear() {
    this.storage.clear();
  }
}
