import React, { useState } from 'react';
import { Button, List, Typography } from '@mui/material';
import { UserProfileListProps } from '@modules/user-profile/interfaces/user-profile.interfaces';
import { client } from '@config/constants';
import {
  MyCustomerAddAddressAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerAddBillingAddressIdAction,
  Address,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerSetDefaultBillingAddressAction,
} from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import {
  Person as PersonIcon,
  DateRange as DateRangeIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import styles from './user-profile-list.module.scss';
import EditableInfoItem from '../editable-info-item/editable-info-item';
import AddressList from '../user-profile-address-list/user-profile-address-list';
import NewAddressForm from '../user-profile-new-address/user-profile-new-address';

const UserProfileList: React.FC<UserProfileListProps> = ({
  userData,
  errors,
  editMode,
  handleDataChange,
  refreshUserData,
}) => {
  const [isAddingNewShippingAddress, setIsAddingNewShippingAddress] = useState(false);
  const [isAddingNewBillingAddress, setIsAddingNewBillingAddress] = useState(false);
  const [newShippingAddress, setNewShippingAddress] = useState<Address>({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [newBillingAddress, setNewBillingAddress] = useState<Address>({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleAddressChange =
    (setAddress: React.Dispatch<React.SetStateAction<Address>>) =>
    (field: keyof Address) =>
    (value: string) => {
      setAddress((prevData: Address) => ({
        ...prevData,
        [field]: value,
      }));
    };

  const handleAddressSubmit = async (
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>,
    address: Address,
    addressType: 'shipping' | 'billing',
    setNewAddress: React.Dispatch<React.SetStateAction<Address>>,
    refreshUserDataCallback: () => void,
  ) => {
    try {
      const response = await client.getClient().me().get().execute();
      const customerVersion = response.body.version;
      const setAddressResponse = await client
        .getClient()
        .me()
        .post({
          body: {
            version: customerVersion,
            actions: [
              {
                action: 'addAddress',
                address,
              } as MyCustomerAddAddressAction,
            ],
          },
        })
        .execute();

      const newAddressId = setAddressResponse.body.addresses.find(
        addr =>
          addr.streetName === address.streetName &&
          addr.city === address.city &&
          addr.postalCode === address.postalCode &&
          addr.country === address.country,
      )?.id;

      if (newAddressId) {
        const addAddressAction =
          addressType === 'shipping'
            ? ({
                action: 'addShippingAddressId',
                addressId: newAddressId,
              } as MyCustomerAddShippingAddressIdAction)
            : ({
                action: 'addBillingAddressId',
                addressId: newAddressId,
              } as MyCustomerAddBillingAddressIdAction);

        await client
          .getClient()
          .me()
          .post({
            body: {
              version: setAddressResponse.body.version,
              actions: [addAddressAction],
            },
          })
          .execute();

        toast.success(
          `New ${addressType.charAt(0).toUpperCase() + addressType.slice(1)} Address Successfully Added!`,
        );
        setIsAdding(false);
        setNewAddress({ streetName: '', city: '', postalCode: '', country: '' });

        refreshUserDataCallback();
      } else {
        throw new Error('Failed to retrieve new address ID.');
      }
    } catch (error) {
      console.error(`Error adding ${addressType} address:`, error);
      toast.error(
        `Failed to Add ${addressType.charAt(0).toUpperCase() + addressType.slice(1)} Address!`,
      );
    }
  };

  const handleDefaultChange = async (addressId: string, addressType: 'shipping' | 'billing') => {
    try {
      const response = await client.getClient().me().get().execute();
      const customerVersion = response.body.version;

      const setDefaultAction =
        addressType === 'shipping'
          ? ({
              action: 'setDefaultShippingAddress',
              addressId,
            } as MyCustomerSetDefaultShippingAddressAction)
          : ({
              action: 'setDefaultBillingAddress',
              addressId,
            } as MyCustomerSetDefaultBillingAddressAction);

      await client
        .getClient()
        .me()
        .post({
          body: {
            version: customerVersion,
            actions: [setDefaultAction],
          },
        })
        .execute();

      toast.success(
        `Default ${addressType.charAt(0).toUpperCase() + addressType.slice(1)} Address Successfully Updated!`,
      );
      refreshUserData();
    } catch (error) {
      console.error(`Error setting default ${addressType} address:`, error);
      toast.error(
        `Failed to Set Default ${addressType.charAt(0).toUpperCase() + addressType.slice(1)} Address!`,
      );
    }
  };

  return (
    <>
      <Typography variant="subtitle1" className={styles.sectionHeader}>
        Personal Information
      </Typography>
      <List>
        <EditableInfoItem
          icon={PersonIcon}
          label="First Name"
          value={userData.firstName}
          editMode={editMode}
          onChange={handleDataChange('firstName')}
          error={errors.firstName}
        />
        <EditableInfoItem
          icon={PersonIcon}
          label="Last Name"
          value={userData.lastName}
          editMode={editMode}
          onChange={handleDataChange('lastName')}
          error={errors.lastName}
        />
        <EditableInfoItem
          icon={EmailIcon}
          label="Email"
          value={userData.email}
          editMode={editMode}
          onChange={handleDataChange('email')}
          error={errors.email}
        />
        <EditableInfoItem
          icon={DateRangeIcon}
          label="Date Of Birth"
          value={userData.dateOfBirth}
          editMode={editMode}
          onChange={handleDataChange('dateOfBirth')}
          type="date"
          error={errors.dateOfBirth}
        />
      </List>
      <AddressList
        addresses={userData.shippingAddresses}
        defaultAddressId={userData.defaultShippingAddressId}
        errors={errors}
        editMode={editMode}
        handleDataChange={handleDataChange}
        handleDefaultChange={id => handleDefaultChange(id, 'shipping')}
        type="shipping"
      />
      <Button
        variant="contained"
        onClick={() => setIsAddingNewShippingAddress(!isAddingNewShippingAddress)}
        className={styles.addNewAddressButton}>
        {isAddingNewShippingAddress ? 'Cancel New Shipping Address' : 'Add New Shipping Address'}
      </Button>
      {isAddingNewShippingAddress && (
        <NewAddressForm
          address={newShippingAddress}
          isAdding={isAddingNewShippingAddress}
          handleAddressChange={handleAddressChange(setNewShippingAddress)}
          handleAddressSubmit={() =>
            handleAddressSubmit(
              setIsAddingNewShippingAddress,
              newShippingAddress,
              'shipping',
              setNewShippingAddress,
              refreshUserData,
            )
          }
          type="shipping"
        />
      )}
      <AddressList
        addresses={userData.billingAddresses}
        defaultAddressId={userData.defaultBillingAddressId}
        errors={errors}
        editMode={editMode}
        handleDataChange={handleDataChange}
        handleDefaultChange={id => handleDefaultChange(id, 'billing')}
        type="billing"
      />
      <Button
        variant="contained"
        onClick={() => setIsAddingNewBillingAddress(!isAddingNewBillingAddress)}
        className={styles.addNewAddressButton}>
        {isAddingNewBillingAddress ? 'Cancel New Billing Address' : 'Add New Billing Address'}
      </Button>
      {isAddingNewBillingAddress && (
        <NewAddressForm
          address={newBillingAddress}
          isAdding={isAddingNewBillingAddress}
          handleAddressChange={handleAddressChange(setNewBillingAddress)}
          handleAddressSubmit={() =>
            handleAddressSubmit(
              setIsAddingNewBillingAddress,
              newBillingAddress,
              'billing',
              setNewBillingAddress,
              refreshUserData,
            )
          }
          type="billing"
        />
      )}
    </>
  );
};

export default UserProfileList;
