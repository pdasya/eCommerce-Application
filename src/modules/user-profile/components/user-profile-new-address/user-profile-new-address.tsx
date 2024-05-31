import React from 'react';
import {
  Grid,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
} from '@mui/material';
import styles from './user-profile-new-address.module.scss';

interface NewAddressFormProps {
  address: {
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
  };
  isAdding: boolean;
  handleAddressChange: (field: string) => (value: string) => void;
  handleAddressSubmit: () => void;
  type: 'shipping' | 'billing';
}

const NewAddressForm: React.FC<NewAddressFormProps> = ({
  address,
  isAdding,
  handleAddressChange,
  handleAddressSubmit,
  type,
}) => (
  <>
    <Button variant="outlined" onClick={handleAddressSubmit} className={styles.addNewAddressButton}>
      {isAdding
        ? `Save New ${type.charAt(0).toUpperCase() + type.slice(1)} Address`
        : `Add New ${type.charAt(0).toUpperCase() + type.slice(1)} Address`}
    </Button>
    {isAdding && (
      <>
        <Divider variant="fullWidth" className={styles.dividerNewAddress} />
        <Typography variant="h6" className={styles.sectionHeader}>
          Add New {type.charAt(0).toUpperCase() + type.slice(1)} Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Street Name"
              value={address.streetName}
              onChange={e => handleAddressChange('streetName')(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              value={address.city}
              onChange={e => handleAddressChange('city')(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postal Code"
              value={address.postalCode}
              onChange={e => handleAddressChange('postalCode')(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                value={address.country}
                onChange={e => handleAddressChange('country')(e.target.value as string)}>
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

export default NewAddressForm;
