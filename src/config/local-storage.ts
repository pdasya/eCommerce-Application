import { TokenStore } from '@commercetools/sdk-client-v2';
import { ClientSideLocalStorage } from '@/lib/client-side-local-storage.class';

type ClientSideStorageMap = {
  anonymousToken: TokenStore;
  authorizedToken: TokenStore;
};

export const clientSideStorage = new ClientSideLocalStorage<ClientSideStorageMap>();
