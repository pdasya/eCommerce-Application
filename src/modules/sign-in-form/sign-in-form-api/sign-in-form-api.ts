import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { apiRoot } from '@/commercetools/client';
import { IUserDraft } from '@/modules/sign-in-form/interface/sign-in-form';
import { storeKey } from '@/config/constants';

export const signIn = async (
  userDraft: IUserDraft,
): Promise<ClientResponse<CustomerSignInResult>> =>
  apiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .login()
    .post({
      body: userDraft,
    })
    .execute();
