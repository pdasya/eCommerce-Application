import React from 'react';
import { List, FormControlLabel, Checkbox, Typography } from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  LocationCity as LocationCityIcon,
  MarkunreadMailbox as MarkunreadMailboxIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import { Address } from '@commercetools/platform-sdk';
import { AddressListErrors } from '@modules/user-profile/interfaces/user-profile.interfaces';
import EditableInfoItem from '../editable-info-item/editable-info-item';
import styles from './user-profile-address-list.module.scss';

interface AddressListProps {
  addresses: Address[];
  defaultAddressId: string | undefined;
  errors: AddressListErrors;
  editMode: boolean;
  handleDataChange: (path: string) => (value: string) => void;
  handleDefaultChange: (id: string) => void;
  type: 'shipping' | 'billing';
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  defaultAddressId,
  errors,
  editMode,
  handleDataChange,
  handleDefaultChange,
  type,
}) => (
  <>
    <Typography variant="subtitle1" className={styles.sectionHeader}>
      {type === 'shipping' ? 'Shipping Addresses' : 'Billing Addresses'}
    </Typography>
    <List>
      {addresses.map((address, index) => (
        <div key={address.id || index}>
          <EditableInfoItem
            icon={LocationOnIcon}
            label="Street"
            value={address.streetName}
            editMode={editMode}
            onChange={handleDataChange(`${type}Addresses.${index}.streetName`)}
            error={errors[`${type}Addresses`]?.[index]?.streetName}
          />
          <EditableInfoItem
            icon={LocationCityIcon}
            label="City"
            value={address.city}
            editMode={editMode}
            onChange={handleDataChange(`${type}Addresses.${index}.city`)}
            error={errors[`${type}Addresses`]?.[index]?.city}
          />
          <EditableInfoItem
            icon={MarkunreadMailboxIcon}
            label="Postal Code"
            value={address.postalCode}
            editMode={editMode}
            onChange={handleDataChange(`${type}Addresses.${index}.postalCode`)}
            error={errors[`${type}Addresses`]?.[index]?.postalCode}
          />
          <EditableInfoItem
            icon={PublicIcon}
            label="Country"
            value={address.country}
            editMode={editMode}
            onChange={handleDataChange(`${type}Addresses.${index}.country`)}
            type="select"
            options={['US', 'Canada']}
            error={errors[`${type}Addresses`]?.[index]?.country}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={address.id === defaultAddressId}
                onChange={() => handleDefaultChange(address.id!)}
              />
            }
            label={`Default ${type} address`}
            // disabled
            className={styles.defaultCheckbox}
          />
        </div>
      ))}
    </List>
  </>
);

export default AddressList;
