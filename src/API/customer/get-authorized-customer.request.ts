import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { apiFlowManager } from '@config/constants';
import { ICustomer } from '@/interfaces/customer.interface';

const getAuthorizedCustomerRequest = async () => apiFlowManager.getClient().me().get().execute();

const getAuthorizedCustomerResponseAdapter = (response: ClientResponse<Customer>): ICustomer => {
  const { id, version, email } = response.body;

  return { id, version, email };
};

export const getAuthorizedCustomer = async () =>
  getAuthorizedCustomerResponseAdapter(await getAuthorizedCustomerRequest());
