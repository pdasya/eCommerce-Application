import { Dispatch, SetStateAction } from 'react';
import { client } from '@config/constants';
import { UserData } from '../interfaces/user-profile.interfaces';

export const fetchUserData = async (setUserData: Dispatch<SetStateAction<UserData>>) => {
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

    const shippingAddress = addresses.find(address => shippingAddressIds?.includes(address.id!));
    const billingAddress = addresses.find(address => billingAddressIds?.includes(address.id!));

    const isShippingAddressDefault = defaultShippingAddressId === shippingAddress?.id;
    const isBillingAddressDefault = defaultBillingAddressId === billingAddress?.id;

    setUserData({
      firstName,
      lastName,
      dateOfBirth,
      email,
      shippingStreet: shippingAddress?.streetName || 'Failed to load shipping street',
      shippingCity: shippingAddress?.city || 'Failed to load shipping city',
      shippingPostalCode: shippingAddress?.postalCode || 'Failed to load shipping postal code',
      shippingCountry: shippingAddress?.country || 'Failed to load shipping country',
      shippingAddressId: shippingAddress?.id || 'Failed to load shipping id',
      isShippingAddressDefault,
      billingStreet: billingAddress?.streetName || 'Failed to load billing street',
      billingCity: billingAddress?.city || 'Failed to load billing city',
      billingPostalCode: billingAddress?.postalCode || 'Failed to load billing postal code',
      billingCountry: billingAddress?.country || 'Failed to load billing country',
      billingAddressId: billingAddress?.id || 'Failed to load billing id',
      isBillingAddressDefault,
    });
  } catch (error) {
    console.error('Error loading user data:', error);
    setUserData({
      firstName: 'Failed to load first name',
      lastName: 'Failed to load last name',
      dateOfBirth: 'Failed to load date of birth',
      email: 'Failed to load email',
      shippingStreet: 'Failed to load shipping street',
      shippingCity: 'Failed to load shipping city',
      shippingPostalCode: 'Failed to load shipping postal code',
      shippingCountry: 'Failed to load shipping country',
      shippingAddressId: 'Failed to load shipping id',
      isShippingAddressDefault: false,
      billingStreet: 'Failed to load billing street',
      billingCity: 'Failed to load billing city',
      billingPostalCode: 'Failed to load billing postal code',
      billingCountry: 'Failed to load billing country',
      billingAddressId: 'Failed to load billing id',
      isBillingAddressDefault: false,
    });
  }
};
