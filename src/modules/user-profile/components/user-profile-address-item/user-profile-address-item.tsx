import React, { useState } from 'react';
import {
  LocationOn as LocationOnIcon,
  LocationCity as LocationCityIcon,
  MarkunreadMailbox as MarkunreadMailboxIcon,
  Public as PublicIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { Address } from '@commercetools/platform-sdk';
import { AddressListErrors } from '@modules/user-profile/interfaces/user-profile.interfaces';
import { ListItemButton, ListItemText, Collapse, List } from '@mui/material';
import EditableInfoItem from '../editable-info-item/editable-info-item';
import AddressActions from '../user-profile-address-actions/user-profile-address-actions';
// import styles from './address-item.module.scss';

interface AddressItemProps {
  address: Address;
  defaultAddressId: string | undefined;
  errors: AddressListErrors;
  editMode: boolean;
  handleDataChange: (path: string) => (value: string) => void;
  handleDefaultChange: (id: string) => void;
  handleDeleteAddress: (id: string, type: 'shipping' | 'billing') => void;
  type: 'shipping' | 'billing';
  index: number;
}

const AddressItem: React.FC<AddressItemProps> = ({
  address,
  defaultAddressId,
  errors,
  editMode,
  handleDataChange,
  handleDefaultChange,
  handleDeleteAddress,
  type,
  index,
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={`${address.streetName} street, ${address.city} city, ${address.country}`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
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
            options={['US', 'CA']}
            error={errors[`${type}Addresses`]?.[index]?.country}
          />
          <AddressActions
            addressId={address.id!}
            defaultAddressId={defaultAddressId}
            handleDefaultChange={handleDefaultChange}
            handleDeleteAddress={handleDeleteAddress}
            type={type}
          />
        </List>
      </Collapse>
    </List>
  );
};

export default AddressItem;
