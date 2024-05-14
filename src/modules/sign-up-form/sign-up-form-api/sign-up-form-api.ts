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

    console.log('Customer created:', response.body);
  } catch (error) {
    console.error('Error creating customer:', error);
  }
};
