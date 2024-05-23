import { Dispatch, SetStateAction } from 'react';
import { client } from '@config/constants';

interface UserData {
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  shippingStreet: string | undefined;
  shippingCity: string | undefined;
  shippingPostalCode: string | undefined;
  shippingCountry: string;
  isShippingAddressDefault: boolean;
  billingStreet: string | undefined;
  billingCity: string | undefined;
  billingPostalCode: string | undefined;
  billingCountry: string;
  isBillingAddressDefault: boolean;
}

export const fetchUserData = async (setUserData: Dispatch<SetStateAction<UserData>>) => {
  try {
    const response = await client.getClient().me().get().execute();
    const {
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      defaultShippingAddressId,
      defaultBillingAddressId,
    } = response.body;

    const isShippingAddressDefault = defaultShippingAddressId === addresses[0]?.id;
    const isBillingAddressTheSameAsShipping = addresses.length === 1;
    const isBillingAddressDefault = isBillingAddressTheSameAsShipping
      ? defaultBillingAddressId === addresses[0]?.id
      : defaultBillingAddressId === addresses[1]?.id;
    setUserData({
      firstName,
      lastName,
      dateOfBirth,
      shippingStreet: addresses[0].streetName,
      shippingCity: addresses[0].city,
      shippingPostalCode: addresses[0].postalCode,
      shippingCountry: addresses[0].country,
      isShippingAddressDefault,
      billingStreet: isBillingAddressTheSameAsShipping
        ? addresses[0].streetName
        : addresses[1].streetName,
      billingCity: isBillingAddressTheSameAsShipping ? addresses[0].city : addresses[1].city,
      billingPostalCode: isBillingAddressTheSameAsShipping
        ? addresses[0].postalCode
        : addresses[1].postalCode,
      billingCountry: isBillingAddressTheSameAsShipping
        ? addresses[0].country
        : addresses[1].country,
      isBillingAddressDefault,
    });
  } catch (error) {
    console.error('Error loading user data:', error);
    setUserData({
      firstName: 'Failed to load first name',
      lastName: 'Failed to load last name',
      dateOfBirth: 'Failed to load date of birth',
      shippingStreet: 'Failed to load shipping street',
      shippingCity: 'Failed to load shipping city',
      shippingPostalCode: 'Failed to load shipping postal code',
      shippingCountry: 'Failed to load shipping country',
      isShippingAddressDefault: false,
      billingStreet: 'Failed to load shipping street',
      billingCity: 'Failed to load shipping city',
      billingPostalCode: 'Failed to load shipping postal code',
      billingCountry: 'Failed to load shipping country',
      isBillingAddressDefault: false,
    });
  }
};
