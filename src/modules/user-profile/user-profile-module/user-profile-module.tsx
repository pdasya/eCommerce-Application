import React, { FC, useEffect, useState } from 'react';
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
  TextField,
  Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import PublicIcon from '@mui/icons-material/Public';
import styles from './user-profile-module.module.scss';
import { fetchUserData } from '../user-profile-api/fetch-user-data';

interface InfoItemProps {
  icon: React.ComponentType<SvgIconProps>;
  label: string;
  value: string;
}

interface EditableInfoItemProps extends InfoItemProps {
  editMode: boolean;
  onChange: (value: string) => void;
}

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

const EditableInfoItem: React.FC<EditableInfoItemProps> = ({
  icon: Icon,
  label,
  value,
  editMode,
  onChange,
}) => (
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
        {editMode ? (
          <TextField
            fullWidth
            variant="outlined"
            value={value}
            onChange={e => onChange(e.target.value)}
          />
        ) : (
          <Typography variant="subtitle1">{value}</Typography>
        )}
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

  const [editMode, setEditMode] = useState(false);

  const handleDataChange = (field: keyof typeof userData) => (value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  useEffect(() => {
    fetchUserData(setUserData);
  }, []);

  return (
    <Paper elevation={3} className={styles.paperContainer}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <Avatar
            src="https://png.klev.club/uploads/posts/2024-04/png-klev-club-3ngo-p-totoro-png-27.png"
            className={styles.profileAvatar}
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
            <EditableInfoItem
              icon={PersonIcon}
              label="First Name"
              value={userData.firstName}
              editMode={editMode}
              onChange={handleDataChange('firstName')}
            />
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

      <Grid item>
        <Button onClick={() => setEditMode(!editMode)} variant="outlined">
          {editMode ? 'Save' : 'Edit'}
        </Button>
      </Grid>
    </Paper>
  );
};
