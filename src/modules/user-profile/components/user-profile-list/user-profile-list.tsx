import React from 'react';
import { List, Typography, FormControlLabel, Checkbox } from '@mui/material';
import {
  Person as PersonIcon,
  DateRange as DateRangeIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  LocationCity as LocationCityIcon,
  MarkunreadMailbox as MarkunreadMailboxIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import EditableInfoItem from '../editable-info-item/editable-info-item';
import styles from './user-profile-list.module.scss';

interface UserData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  isShippingAddressDefault: boolean;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  isBillingAddressDefault: boolean;
}

export interface Errors {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}

interface UserProfileListProps {
  userData: UserData;
  errors: Errors;
  editMode: boolean;
  handleDataChange: (field: string) => (value: string) => void;
}

const UserProfileList: React.FC<UserProfileListProps> = ({
  userData,
  errors,
  editMode,
  handleDataChange,
}) => (
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
    <Typography variant="subtitle1" className={styles.sectionHeader}>
      Shipping Address
    </Typography>
    <List>
      <EditableInfoItem
        icon={LocationOnIcon}
        label="Street"
        value={userData.shippingStreet}
        editMode={editMode}
        onChange={handleDataChange('shippingStreet')}
      />
      <EditableInfoItem
        icon={LocationCityIcon}
        label="City"
        value={userData.shippingCity}
        editMode={editMode}
        onChange={handleDataChange('shippingCity')}
      />
      <EditableInfoItem
        icon={MarkunreadMailboxIcon}
        label="Postal Code"
        value={userData.shippingPostalCode}
        editMode={editMode}
        onChange={handleDataChange('shippingPostalCode')}
      />
      <EditableInfoItem
        icon={PublicIcon}
        label="Country"
        value={userData.shippingCountry}
        editMode={editMode}
        onChange={handleDataChange('shippingCountry')}
        type="select"
        options={['US', 'Canada']}
      />
      <FormControlLabel
        control={<Checkbox checked={userData.isShippingAddressDefault} />}
        label="Default shipping address"
        disabled
      />
    </List>
    <Typography variant="subtitle1" className={styles.sectionHeader}>
      Billing Address
    </Typography>
    <List>
      <EditableInfoItem
        icon={LocationOnIcon}
        label="Street"
        value={userData.billingStreet}
        editMode={editMode}
        onChange={handleDataChange('billingStreet')}
      />
      <EditableInfoItem
        icon={LocationCityIcon}
        label="City"
        value={userData.billingCity}
        editMode={editMode}
        onChange={handleDataChange('billingCity')}
      />
      <EditableInfoItem
        icon={MarkunreadMailboxIcon}
        label="Postal Code"
        value={userData.billingPostalCode}
        editMode={editMode}
        onChange={handleDataChange('billingPostalCode')}
      />
      <EditableInfoItem
        icon={PublicIcon}
        label="Country"
        value={userData.billingCountry}
        editMode={editMode}
        onChange={handleDataChange('billingCountry')}
        type="select"
        options={['US', 'Canada']}
      />
      <FormControlLabel
        control={<Checkbox checked={userData.isBillingAddressDefault} />}
        label="Default billing address"
        disabled
      />
    </List>
  </>
);

export default UserProfileList;
