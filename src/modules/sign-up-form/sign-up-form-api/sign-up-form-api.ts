import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { apiRoot } from '@/commercetools/client';
import { storeKey } from '@/config/constants';

export const createCustomerInStore = async (
  customerDraft: CustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> => {
  try {
    const response = await apiRoot
      .inStoreKeyWithStoreKeyValue({ storeKey })
      .customers()
      .post({ body: customerDraft })
      .execute();
    console.log(response.body);
    return response;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};
