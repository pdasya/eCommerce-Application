import { Dispatch, SetStateAction } from 'react';
import { client } from '@config/constants';
import { PersonalUserData } from '../interfaces/user-profile.interfaces';

export const fetchUserData = async (setUserData: Dispatch<SetStateAction<PersonalUserData>>) => {
  try {
    const response = await client.getClient().me().get().execute();
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      addresses,
      shippingAddressIds,
      billingAddressIds,
      defaultShippingAddressId,
      defaultBillingAddressId,
    } = response.body;

    const shippingAddresses = addresses.filter(address =>
      shippingAddressIds?.includes(address.id!),
    );
    const billingAddresses = addresses.filter(address => billingAddressIds?.includes(address.id!));

    setUserData({
      firstName,
      lastName,
      dateOfBirth,
      email,
      shippingAddresses,
      defaultShippingAddressId,
      billingAddresses,
      defaultBillingAddressId,
    });
  } catch (error) {
    setUserData({
      firstName: 'Failed to load first name',
      lastName: 'Failed to load last name',
      dateOfBirth: 'Failed to load date of birth',
      email: 'Failed to load email',
      shippingAddresses: [],
      billingAddresses: [],
      defaultShippingAddressId: 'Failed to load default shipping address',
      defaultBillingAddressId: 'Failed to load default billing address',
    });
  }
};
