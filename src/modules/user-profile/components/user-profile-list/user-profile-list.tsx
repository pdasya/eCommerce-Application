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
import {
  MyCustomerAddBillingAddressAction,
  MyCustomerAddShippingAddressAction,
  UserProfileListProps,
} from '@modules/user-profile/interfaces/user-profile.interfaces';
import { client } from '@config/constants';
import { MyCustomerAddAddressAction } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import styles from './user-profile-list.module.scss';
import EditableInfoItem from '../editable-info-item/editable-info-item';

const UserProfileList: React.FC<UserProfileListProps> = ({
  userData,
  errors,
  editMode,
  handleDataChange,
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

  const handleNewShippingAddressChange =
    (field: keyof typeof newShippingAddress) => (value: string) => {
      setNewShippingAddress(prevData => ({
        ...prevData,
        [field]: value,
      }));
    };

  const handleNewBillingAddressChange =
    (field: keyof typeof newBillingAddress) => (value: string) => {
      setNewBillingAddress(prevData => ({
        ...prevData,
        [field]: value,
      }));
    };

  const handleNewShippingAddressSubmit = async () => {
    const addressData = {
      action: 'addAddress',
      address: {
        streetName: newShippingAddress.streetName,
        city: newShippingAddress.city,
        postalCode: newShippingAddress.postalCode,
        country: newShippingAddress.country,
      },
    };

    if (!isAddingNewShippingAddress) {
      setIsAddingNewShippingAddress(true);
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
              actions: [addressData as MyCustomerAddAddressAction],
            },
          })
          .execute()
          .then(setShippingAddressResponse => {
            const newAddressId = setShippingAddressResponse.body.addresses.find(
              address =>
                address.streetName === newShippingAddress.streetName &&
                address.city === newShippingAddress.city &&
                address.postalCode === newShippingAddress.postalCode &&
                address.country === newShippingAddress.country,
            )?.id;
            const addShippingAddressAction = {
              action: 'addShippingAddressId',
              addressId: newAddressId,
            };
            client
              .getClient()
              .me()
              .post({
                body: {
                  version: setShippingAddressResponse.body.version,
                  actions: [addShippingAddressAction as MyCustomerAddShippingAddressAction],
                },
              })
              .execute();
          });

        toast.success('New Shipping Address Successfully Added!');
        setIsAddingNewShippingAddress(false);
        setNewShippingAddress({ streetName: '', city: '', postalCode: '', country: '' });
      } catch (error) {
        console.error('Error adding address:', error);
        toast.error('Failed to Add Shipping Address!');
      }
    }
  };

  const handleNewBillingAddressSubmit = async () => {
    const addressData = {
      action: 'addAddress',
      address: {
        streetName: newBillingAddress.streetName,
        city: newBillingAddress.city,
        postalCode: newBillingAddress.postalCode,
        country: newBillingAddress.country,
      },
    };

    if (!isAddingNewBillingAddress) {
      setIsAddingNewBillingAddress(true);
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
              actions: [addressData as MyCustomerAddAddressAction],
            },
          })
          .execute()
          .then(setBillingAddressResponse => {
            const newAddressId = setBillingAddressResponse.body.addresses.find(
              address =>
                address.streetName === newBillingAddress.streetName &&
                address.city === newBillingAddress.city &&
                address.postalCode === newBillingAddress.postalCode &&
                address.country === newBillingAddress.country,
            )?.id;
            const addBillingAddressAction = {
              action: 'addBillingAddressId',
              addressId: newAddressId,
            };
            client
              .getClient()
              .me()
              .post({
                body: {
                  version: setBillingAddressResponse.body.version,
                  actions: [addBillingAddressAction as MyCustomerAddBillingAddressAction],
                },
              })
              .execute();
          });
        toast.success('New Billing Address Successfully Added!');
        setIsAddingNewBillingAddress(false);
        setNewBillingAddress({ streetName: '', city: '', postalCode: '', country: '' });
      } catch (error) {
        console.error('Error adding address:', error);
        toast.error('Failed to Add Billing Address!');
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
      <Typography variant="subtitle1" className={styles.sectionHeader}>
        Shipping Addresses
      </Typography>
      <List>
        {userData.shippingAddresses.map((address, index) => (
          <div key={index}>
            <EditableInfoItem
              icon={LocationOnIcon}
              label="Street"
              value={address.streetName}
              editMode={editMode}
              onChange={handleDataChange(`shippingAddresses.${index}.streetName`)}
              error={errors.shippingAddresses?.[index]?.streetName}
            />
            <EditableInfoItem
              icon={LocationCityIcon}
              label="City"
              value={address.city}
              editMode={editMode}
              onChange={handleDataChange(`shippingAddresses.${index}.city`)}
              error={errors.shippingAddresses?.[index]?.city}
            />
            <EditableInfoItem
              icon={MarkunreadMailboxIcon}
              label="Postal Code"
              value={address.postalCode}
              editMode={editMode}
              onChange={handleDataChange(`shippingAddresses.${index}.postalCode`)}
              error={errors.shippingAddresses?.[index]?.postalCode}
            />
            <EditableInfoItem
              icon={PublicIcon}
              label="Country"
              value={address.country}
              editMode={editMode}
              onChange={handleDataChange(`shippingAddresses.${index}.country`)}
              type="select"
              options={['US', 'Canada']}
              error={errors.shippingAddresses?.[index]?.country}
            />
            <FormControlLabel
              control={<Checkbox checked={address.id === userData.defaultShippingAddressId} />}
              label="Default shipping address"
              disabled
              className={styles.defaultCheckbox}
            />
          </div>
        ))}
      </List>
      <Button
        variant="outlined"
        onClick={handleNewShippingAddressSubmit}
        className={styles.addNewAddressButton}>
        {isAddingNewShippingAddress ? 'Save New Shipping Address' : 'Add New Shipping Address'}
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
                value={newShippingAddress.streetName}
                onChange={e => handleNewShippingAddressChange('streetName')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={newShippingAddress.city}
                onChange={e => handleNewShippingAddressChange('city')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                value={newShippingAddress.postalCode}
                onChange={e => handleNewShippingAddressChange('postalCode')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={newShippingAddress.country}
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
        Billing Addresses
      </Typography>
      <List>
        {userData.billingAddresses.map((address, index) => (
          <div key={index}>
            <EditableInfoItem
              icon={LocationOnIcon}
              label="Street"
              value={address.streetName}
              editMode={editMode}
              onChange={handleDataChange(`billingAddresses.${index}.streetName`)}
              error={errors.billingAddresses?.[index]?.streetName}
            />
            <EditableInfoItem
              icon={LocationCityIcon}
              label="City"
              value={address.city}
              editMode={editMode}
              onChange={handleDataChange(`billingAddresses.${index}.city`)}
              error={errors.billingAddresses?.[index]?.city}
            />
            <EditableInfoItem
              icon={MarkunreadMailboxIcon}
              label="Postal Code"
              value={address.postalCode}
              editMode={editMode}
              onChange={handleDataChange(`billingAddresses.${index}.postalCode`)}
              error={errors.billingAddresses?.[index]?.postalCode}
            />
            <EditableInfoItem
              icon={PublicIcon}
              label="Country"
              value={address.country}
              editMode={editMode}
              onChange={handleDataChange(`billingAddresses.${index}.country`)}
              type="select"
              options={['US', 'Canada']}
              error={errors.billingAddresses?.[index]?.country}
            />
            <FormControlLabel
              control={<Checkbox checked={address.id === userData.defaultBillingAddressId} />}
              label="Default billing address"
              disabled
              className={styles.defaultCheckbox}
            />
          </div>
        ))}
      </List>
      <Button
        variant="outlined"
        onClick={handleNewBillingAddressSubmit}
        className={styles.addNewAddressButton}>
        {isAddingNewBillingAddress ? 'Save New Billing Address' : 'Add New Billing Address'}
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
                value={newBillingAddress.streetName}
                onChange={e => handleNewBillingAddressChange('streetName')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={newBillingAddress.city}
                onChange={e => handleNewBillingAddressChange('city')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                value={newBillingAddress.postalCode}
                onChange={e => handleNewBillingAddressChange('postalCode')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={newBillingAddress.country}
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
