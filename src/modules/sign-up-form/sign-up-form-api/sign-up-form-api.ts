import { CustomerDraft } from '@commercetools/platform-sdk';
import { apiRoot } from '@/commercetools/client';

const storeKey = 'e58af6c6-618a-49cd-9cfa-84ffcf3cf879';

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
