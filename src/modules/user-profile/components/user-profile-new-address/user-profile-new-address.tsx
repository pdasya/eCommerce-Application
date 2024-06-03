import React, { useState } from 'react';
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
import { Address } from '@commercetools/platform-sdk';
import { addressValidationSchema } from '@config/validation-schema';
import * as Yup from 'yup';
import styles from './user-profile-new-address.module.scss';

interface NewAddressFormProps {
  address: Address;
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
}) => {
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});

  const validateAndSubmit = async () => {
    try {
      await addressValidationSchema.validate(address, { abortEarly: false });
      setErrors({});
      handleAddressSubmit();
    } catch (validationErrors) {
      const formErrors: Partial<Record<keyof Address, string>> = {};
      if (validationErrors instanceof Yup.ValidationError) {
        validationErrors.inner.forEach(error => {
          if (error.path) {
            formErrors[error.path as keyof Address] = error.message;
          }
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <>
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
                error={!!errors.streetName}
                helperText={errors.streetName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={address.city}
                onChange={e => handleAddressChange('city')(e.target.value)}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                value={address.postalCode}
                onChange={e => handleAddressChange('postalCode')(e.target.value)}
                error={!!errors.postalCode}
                helperText={errors.postalCode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.country}>
                <InputLabel>Country</InputLabel>
                <Select
                  value={address.country}
                  onChange={e => handleAddressChange('country')(e.target.value as string)}>
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="CA">Canada</MenuItem>
                </Select>
                {errors.country && <Typography color="error">{errors.country}</Typography>}
              </FormControl>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" className={styles.dividerNewAddress} />
        </>
      )}
      <Button variant="outlined" onClick={validateAndSubmit} className={styles.addNewAddressButton}>
        {isAdding
          ? `Save New ${type.charAt(0).toUpperCase() + type.slice(1)} Address`
          : `Add New ${type.charAt(0).toUpperCase() + type.slice(1)} Address`}
      </Button>
    </>
  );
};

export default NewAddressForm;
