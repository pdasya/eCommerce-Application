import { apiRoot } from '@/commercetools/client';
import { IUserDraft } from '@/modules/sign-in-form/interface/sign-in-form';
import { storeKey } from '@/config/constants';

export const signIn = async (userDraft: IUserDraft) =>
  apiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .login()
    .post({
      body: userDraft,
    })
    .execute();

export const existCustomerByEmail = async (customerEmail: string) =>
  apiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .customers()
    .get({
      queryArgs: {
        where: `email="${customerEmail}"`,
      },
    })
    .execute();
