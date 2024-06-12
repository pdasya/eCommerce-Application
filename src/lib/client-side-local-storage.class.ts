import { IClientSideStorage } from '@/interfaces/client-side-storage.interface';

/**
 * Client-side data storage class based on local storage.
 */
export class ClientSideLocalStorage<StorageMap extends Record<string, unknown>>
  implements IClientSideStorage<StorageMap>
{
  public set<K extends keyof StorageMap>(key: K, value: StorageMap[K]): this {
    localStorage.setItem(key.toString(), JSON.stringify(value));
    return this;
  }

  public get<K extends keyof StorageMap>(key: K): StorageMap[K] | undefined {
    const stringified = localStorage.getItem(key.toString());
    return stringified === null ? null : JSON.parse(stringified);
  }

  public remove<K extends keyof StorageMap>(key: K): this {
    localStorage.removeItem(key.toString());
    return this;
  }

  public flush(): this {
    localStorage.clear();
    return this;
  }
}
