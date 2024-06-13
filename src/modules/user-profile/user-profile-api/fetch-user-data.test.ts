import { apiFlowManager } from '@config/constants';
import { fetchUserData } from './fetch-user-data';

jest.mock('@config/constants', () => ({
  apiFlowManager: {
    getClient: jest.fn().mockReturnThis(),
    me: jest.fn().mockReturnThis(),
    get: jest.fn().mockReturnThis(),
    execute: jest.fn(),
  },
}));

describe('fetchUserData', () => {
  const mockSetUserData = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and sets user data successfully', async () => {
    const mockResponse = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        email: 'john.doe@example.com',
        addresses: [
          {
            id: '1',
            streetName: '123 Main St',
            city: 'New York',
            postalCode: '10001',
            country: 'US',
          },
          {
            id: '2',
            streetName: '456 Broadway',
            city: 'Los Angeles',
            postalCode: '90001',
            country: 'US',
          },
        ],
        shippingAddressIds: ['1'],
        billingAddressIds: ['2'],
        defaultShippingAddressId: '1',
        defaultBillingAddressId: '2',
      },
    };

    (apiFlowManager.getClient().me().get().execute as jest.Mock).mockResolvedValue(mockResponse);

    await fetchUserData(mockSetUserData);

    expect(mockSetUserData).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      email: 'john.doe@example.com',
      shippingAddresses: [
        {
          id: '1',
          streetName: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'US',
        },
      ],
      billingAddresses: [
        {
          id: '2',
          streetName: '456 Broadway',
          city: 'Los Angeles',
          postalCode: '90001',
          country: 'US',
        },
      ],
      defaultShippingAddressId: '1',
      defaultBillingAddressId: '2',
    });
  });

  test('handles errors and sets fallback user data', async () => {
    (apiFlowManager.getClient().me().get().execute as jest.Mock).mockRejectedValue(
      new Error('API Error'),
    );

    await fetchUserData(mockSetUserData);

    expect(mockSetUserData).toHaveBeenCalledWith({
      firstName: 'Failed to load first name',
      lastName: 'Failed to load last name',
      dateOfBirth: 'Failed to load date of birth',
      email: 'Failed to load email',
      shippingAddresses: [],
      billingAddresses: [],
      defaultShippingAddressId: 'Failed to load default shipping address',
      defaultBillingAddressId: 'Failed to load default billing address',
    });
  });
});
