import React, { useState } from 'react';
import {
  List,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {
  Person as PersonIcon,
  DateRange as DateRangeIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  LocationCity as LocationCityIcon,
  MarkunreadMailbox as MarkunreadMailboxIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import { UserProfileListProps } from '@modules/user-profile/interfaces/user-profile.interfaces';
import EditableInfoItem from '../editable-info-item/editable-info-item';
import styles from './user-profile-list.module.scss';

const UserProfileList: React.FC<UserProfileListProps> = ({
  userData,
  errors,
  editMode,
  handleDataChange,
}) => {
  const [isAddingNewShippingAddress, setIsAddingNewShippingAddress] = useState(false);
  const [isAddingNewBillingAddress, setIsAddingNewBillingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleNewShippingAddressChange = (field: keyof typeof newAddress) => (value: string) => {
    setNewAddress(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddNewShippingAddressClick = () => {
    setIsAddingNewShippingAddress(true);
  };

  const handleNewBillingAddressChange = (field: keyof typeof newAddress) => (value: string) => {
    setNewAddress(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddNewBillingAddressClick = () => {
    setIsAddingNewBillingAddress(true);
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
          error={errors.shippingStreet}
        />
        <EditableInfoItem
          icon={LocationCityIcon}
          label="City"
          value={userData.shippingCity}
          editMode={editMode}
          onChange={handleDataChange('shippingCity')}
          error={errors.shippingCity}
        />
        <EditableInfoItem
          icon={MarkunreadMailboxIcon}
          label="Postal Code"
          value={userData.shippingPostalCode}
          editMode={editMode}
          onChange={handleDataChange('shippingPostalCode')}
          error={errors.shippingPostalCode}
        />
        <EditableInfoItem
          icon={PublicIcon}
          label="Country"
          value={userData.shippingCountry}
          editMode={editMode}
          onChange={handleDataChange('shippingCountry')}
          type="select"
          options={['US', 'Canada']}
          error={errors.shippingCountry}
        />
        <FormControlLabel
          control={<Checkbox checked={userData.isShippingAddressDefault} />}
          label="Default shipping address"
          disabled
          className={styles.defaultCheckbox}
        />
      </List>
      <Button
        variant="outlined"
        onClick={handleAddNewShippingAddressClick}
        className={styles.addNewAddressButton}>
        {isAddingNewShippingAddress ? 'Save Changes' : 'Add New Shipping Address'}
      </Button>
      {isAddingNewShippingAddress && (
        <>
          <Divider variant="fullWidth" className={styles.dividerNewAddress} />
          <Typography variant="h6" className={styles.sectionHeader}>
            Add New Shipping Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street Name"
                value={newAddress.streetName}
                onChange={e => handleNewShippingAddressChange('streetName')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={newAddress.city}
                onChange={e => handleNewShippingAddressChange('city')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                value={newAddress.postalCode}
                onChange={e => handleNewShippingAddressChange('postalCode')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={newAddress.country}
                  onChange={e =>
                    handleNewShippingAddressChange('country')(e.target.value as string)
                  }>
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" className={styles.dividerNewAddress} />
        </>
      )}
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
          error={errors.billingStreet}
        />
        <EditableInfoItem
          icon={LocationCityIcon}
          label="City"
          value={userData.billingCity}
          editMode={editMode}
          onChange={handleDataChange('billingCity')}
          error={errors.billingCity}
        />
        <EditableInfoItem
          icon={MarkunreadMailboxIcon}
          label="Postal Code"
          value={userData.billingPostalCode}
          editMode={editMode}
          onChange={handleDataChange('billingPostalCode')}
          error={errors.billingPostalCode}
        />
        <EditableInfoItem
          icon={PublicIcon}
          label="Country"
          value={userData.billingCountry}
          editMode={editMode}
          onChange={handleDataChange('billingCountry')}
          type="select"
          options={['US', 'Canada']}
          error={errors.billingCountry}
        />
        <FormControlLabel
          control={<Checkbox checked={userData.isBillingAddressDefault} />}
          label="Default billing address"
          disabled
          className={styles.defaultCheckbox}
        />
      </List>
      <Button
        variant="outlined"
        onClick={handleAddNewBillingAddressClick}
        className={styles.addNewAddressButton}>
        {isAddingNewBillingAddress ? 'Save Changes' : 'Add New Billing Address'}
      </Button>
      {isAddingNewBillingAddress && (
        <>
          <Divider variant="fullWidth" className={styles.dividerNewAddress} />
          <Typography variant="h6" className={styles.sectionHeader}>
            Add New Billing Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street Name"
                value={newAddress.streetName}
                onChange={e => handleNewBillingAddressChange('streetName')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={newAddress.city}
                onChange={e => handleNewBillingAddressChange('city')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                value={newAddress.postalCode}
                onChange={e => handleNewBillingAddressChange('postalCode')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={newAddress.country}
                  onChange={e =>
                    handleNewBillingAddressChange('country')(e.target.value as string)
                  }>
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" className={styles.dividerNewAddress} />
        </>
      )}
    </>
  );
};

export default UserProfileList;
