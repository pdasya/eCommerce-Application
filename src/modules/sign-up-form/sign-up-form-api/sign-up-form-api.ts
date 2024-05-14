import { CustomerDraft } from '@commercetools/platform-sdk';
import { apiRoot } from '@/commercetools/client';
import { storeKey } from '@/config/constants';

export const createCustomerInStore = async (customerDraft: CustomerDraft) => {
  try {
    const response = await apiRoot
      .inStoreKeyWithStoreKeyValue({ storeKey })
      .customers()
      .post({ body: customerDraft })
      .execute();

    return response.body;
  } catch (error) {
    console.error('Error creating customer:', error);
    return null;
  }
};
