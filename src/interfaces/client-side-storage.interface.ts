/**
 * Determines the shape of client-side storage for data, that
 * should be persisted between sessions.
 */
export interface IClientSideStorage<StorageMap extends Record<string, unknown>> {
  set: <K extends keyof StorageMap>(key: K, value: StorageMap[K]) => this;
  get: <K extends keyof StorageMap>(key: K) => StorageMap[K] | undefined;
  remove: <K extends keyof StorageMap>(key: K) => this;
  flush: () => this;
}
