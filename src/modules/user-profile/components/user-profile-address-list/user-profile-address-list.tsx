import React from 'react';
import { List, Typography } from '@mui/material';
import { Address } from '@commercetools/platform-sdk';
import { AddressListErrors } from '@modules/user-profile/interfaces/user-profile.interfaces';
import styles from './user-profile-address-list.module.scss';
import AddressItem from '../user-profile-address-item/user-profile-address-item';

interface AddressListProps {
  addresses: Address[];
  defaultAddressId: string | undefined;
  errors: AddressListErrors;
  editMode: boolean;
  handleDataChange: (path: string) => (value: string) => void;
  handleDefaultChange: (id: string) => void;
  handleDeleteAddress: (id: string, type: 'shipping' | 'billing') => void;
  type: 'shipping' | 'billing';
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  defaultAddressId,
  errors,
  editMode,
  handleDataChange,
  handleDefaultChange,
  handleDeleteAddress,
  type,
}) => (
  <>
    <Typography variant="subtitle1" className={styles.sectionHeader}>
      {type === 'shipping' ? 'Shipping Addresses' : 'Billing Addresses'}
    </Typography>
    {addresses.length === 0 ? (
      <Typography variant="body1" className={styles.noAddressesMessage}>
        No {type === 'shipping' ? 'shipping' : 'billing'} addresses available.
      </Typography>
    ) : (
      <List>
        {addresses.map((address, index) => (
          <AddressItem
            key={address.id || index}
            address={address}
            defaultAddressId={defaultAddressId}
            errors={errors}
            editMode={editMode}
            handleDataChange={handleDataChange}
            handleDefaultChange={handleDefaultChange}
            handleDeleteAddress={handleDeleteAddress}
            type={type}
            index={index}
          />
        ))}
      </List>
    )}
  </>
);

export default AddressList;
