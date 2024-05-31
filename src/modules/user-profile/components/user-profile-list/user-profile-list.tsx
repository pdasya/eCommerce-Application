import React, { useState } from 'react';
import { List, Typography } from '@mui/material';
import { UserProfileListProps } from '@modules/user-profile/interfaces/user-profile.interfaces';
import { client } from '@config/constants';
import {
  MyCustomerAddAddressAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerAddBillingAddressIdAction,
  Address,
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
  const [newShippingAddress, setNewShippingAddress] = useState({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [newBillingAddress, setNewBillingAddress] = useState({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleAddressChange =
    (setAddress: React.Dispatch<React.SetStateAction<Address>>) =>
    (field: string) =>
    (value: string) => {
      setAddress((prevData: Address) => ({
        ...prevData,
        [field]: value,
      }));
    };

  const handleAddressSubmit = async (
    isAdding: boolean,
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>,
    address: Address,
    addressType: 'shipping' | 'billing',
    actionType: MyCustomerAddShippingAddressIdAction | MyCustomerAddBillingAddressIdAction,
    addressData: MyCustomerAddAddressAction,
    setNewAddress: React.Dispatch<React.SetStateAction<Address>>,
    refreshUserDataCallback: () => void,
  ) => {
    if (!isAdding) {
      setIsAdding(true);
    } else {
      try {
        const response = await client.getClient().me().get().execute();
        const customerVersion = response.body.version;
        await client
          .getClient()
          .me()
          .post({
            body: {
              version: customerVersion,
              actions: [addressData],
            },
          })
          .execute()
          .then(setAddressResponse => {
            const newAddressId = setAddressResponse.body.addresses.find(
              addr =>
                addr.streetName === address.streetName &&
                addr.city === address.city &&
                addr.postalCode === address.postalCode &&
                addr.country === address.country,
            )?.id;

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

            client
              .getClient()
              .me()
              .post({
                body: {
                  version: setAddressResponse.body.version,
                  actions: [addAddressAction],
                },
              })
              .execute();
          });

        toast.success(
          `New ${addressType.charAt(0).toUpperCase() + addressType.slice(1)} Address Successfully Added!`,
        );
        setIsAdding(false);
        setNewAddress({ streetName: '', city: '', postalCode: '', country: '' });

        refreshUserDataCallback();
      } catch (error) {
        console.error(`Error adding ${addressType} address:`, error);
        toast.error(
          `Failed to Add ${addressType.charAt(0).toUpperCase() + addressType.slice(1)} Address!`,
        );
      }
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
        type="shipping"
      />
      <NewAddressForm
        address={newShippingAddress}
        isAdding={isAddingNewShippingAddress}
        handleAddressChange={handleAddressChange(setNewShippingAddress)}
        handleAddressSubmit={() =>
          handleAddressSubmit(
            isAddingNewShippingAddress,
            setIsAddingNewShippingAddress,
            newShippingAddress,
            'shipping',
            {
              action: 'addShippingAddressId',
              addressId: '',
            } as MyCustomerAddShippingAddressIdAction,
            {
              action: 'addAddress',
              address: newShippingAddress,
            },
            setNewShippingAddress,
            refreshUserData,
          )
        }
        type="shipping"
      />
      <AddressList
        addresses={userData.billingAddresses}
        defaultAddressId={userData.defaultBillingAddressId}
        errors={errors}
        editMode={editMode}
        handleDataChange={handleDataChange}
        type="billing"
      />
      <NewAddressForm
        address={newBillingAddress}
        isAdding={isAddingNewBillingAddress}
        handleAddressChange={handleAddressChange(setNewBillingAddress)}
        handleAddressSubmit={() =>
          handleAddressSubmit(
            isAddingNewBillingAddress,
            setIsAddingNewBillingAddress,
            newBillingAddress,
            'billing',
            { action: 'addBillingAddressId', addressId: '' } as MyCustomerAddBillingAddressIdAction,
            {
              action: 'addAddress',
              address: newBillingAddress,
            },
            setNewShippingAddress,
            refreshUserData,
          )
        }
        type="billing"
      />
    </>
  );
};

export default UserProfileList;
