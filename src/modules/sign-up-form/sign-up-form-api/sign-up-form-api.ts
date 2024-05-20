import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { client } from '@/config/constants';

export const createCustomerInStore = async (
  customerDraft: CustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> => {
  const response = await client
    .anonymousSession()
    .customers()
    .post({ body: customerDraft })
    .execute();
  return response;
};
