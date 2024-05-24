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
  MenuItem,
  Select,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import PublicIcon from '@mui/icons-material/Public';
import { toast } from 'react-toastify';
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
  type?: string;
  options?: string[];
}

const EditableInfoItem: React.FC<EditableInfoItemProps> = ({
  icon: Icon,
  label,
  value,
  editMode,
  onChange,
  type = 'text',
  options = [],
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
          type === 'select' ? (
            <Select
              value={value}
              onChange={e => onChange(e.target.value)}
              fullWidth
              variant="outlined">
              {options.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              value={value}
              onChange={e => onChange(e.target.value)}
              type={type}
            />
          )
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

  const handleClick = () => {
    setEditMode(!editMode);

    if (editMode) {
      toast.success(`Form successfully updated!`);
    }
  };

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
            <EditableInfoItem
              icon={PersonIcon}
              label="Last Name"
              value={userData.lastName}
              editMode={editMode}
              onChange={handleDataChange('lastName')}
            />
            <EditableInfoItem
              icon={DateRangeIcon}
              label="Date Of Birth"
              value={userData.dateOfBirth}
              editMode={editMode}
              onChange={handleDataChange('dateOfBirth')}
              type="date"
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
        <Button onClick={handleClick} variant="outlined">
          {editMode ? 'Save Changes' : 'Edit Your Information'}
        </Button>
      </Grid>
    </Paper>
  );
};
