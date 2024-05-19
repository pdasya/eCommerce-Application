import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { IUserDraft } from '@/modules/sign-in-form/interfaces/sign-in-form.interfaces';
import { client } from '@/config/constants';

export const signIn = async (
  userDraft: IUserDraft,
): Promise<ClientResponse<CustomerSignInResult>> =>
  client
    .passwordSession(userDraft)
    .me()
    .login()
    .post({
      body: userDraft,
    })
    .execute();
