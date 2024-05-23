import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { client } from '@config/constants';
import {
  Typography,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  SvgIconProps,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import PublicIcon from '@mui/icons-material/Public';
import styles from './user-profile-module.module.scss';

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

interface InfoItemProps {
  icon: React.ComponentType<SvgIconProps>;
  label: string;
  value: string;
}

const fetchUserData = async (setUserData: Dispatch<SetStateAction<UserData>>) => {
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

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <ListItem>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <Grid container alignItems="center">
      <Grid item xs>
        <Typography variant="subtitle1" className={styles.fieldName}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="subtitle1">{value}</Typography>
      </Grid>
    </Grid>
  </ListItem>
);

export const UserProfileModule: FC = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    shippingStreet: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: '',
    isShippingAddressDefault: false,
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
    isBillingAddressDefault: false,
  });

  useEffect(() => {
    fetchUserData(setUserData);
  }, []);

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <Avatar
            src="https://png.klev.club/uploads/posts/2024-04/png-klev-club-3ngo-p-totoro-png-27.png"
            sx={{ width: 80, height: 80 }}
            alt="Profile Photo"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography gutterBottom variant="h4">
            {userData.firstName} {userData.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" className={styles.sectionHeader}>
            Personal Information
          </Typography>
          <List>
            <InfoItem icon={PersonIcon} label="First Name" value={userData.firstName} />
            <InfoItem icon={PersonIcon} label="Last Name" value={userData.lastName} />
            <InfoItem icon={DateRangeIcon} label="Date of Birth" value={userData.dateOfBirth} />
          </List>
          <Typography variant="subtitle1" className={styles.sectionHeader}>
            Shipping Address
          </Typography>
          <List>
            <InfoItem icon={LocationOnIcon} label="Street" value={userData.shippingStreet} />
            <InfoItem icon={LocationCityIcon} label="City" value={userData.shippingCity} />
            <InfoItem
              icon={MarkunreadMailboxIcon}
              label="Postal Code"
              value={userData.shippingPostalCode}
            />
            <InfoItem icon={PublicIcon} label="Country" value={userData.shippingCountry} />
            <ListItem>
              <FormControlLabel
                control={<Checkbox checked={userData.isShippingAddressDefault} />}
                label="Default shipping address"
                disabled
              />
            </ListItem>
          </List>
          <Typography variant="subtitle1" className={styles.sectionHeader}>
            Billing Address
          </Typography>
          <List>
            <InfoItem icon={LocationOnIcon} label="Street" value={userData.billingStreet} />
            <InfoItem icon={LocationCityIcon} label="City" value={userData.billingCity} />
            <InfoItem
              icon={MarkunreadMailboxIcon}
              label="Postal Code"
              value={userData.billingPostalCode}
            />
            <InfoItem icon={PublicIcon} label="Country" value={userData.billingCountry} />
            <ListItem>
              <FormControlLabel
                control={<Checkbox checked={userData.isBillingAddressDefault} />}
                label="Default billing address"
                disabled
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};
