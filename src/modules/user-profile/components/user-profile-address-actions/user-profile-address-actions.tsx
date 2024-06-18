import React from 'react';
import { FormControlLabel, Checkbox, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import * as styles from './user-profile-address-actions.module.scss';

interface AddressActionsProps {
  addressId: string;
  defaultAddressId: string | undefined;
  handleDefaultChange: (id: string) => void;
  handleDeleteAddress: (id: string, type: 'shipping' | 'billing') => void;
  type: 'shipping' | 'billing';
}

const AddressActions: React.FC<AddressActionsProps> = ({
  addressId,
  defaultAddressId,
  handleDefaultChange,
  handleDeleteAddress,
  type,
}) => (
  <div className={styles.addressActions}>
    <FormControlLabel
      control={
        <Checkbox
          checked={addressId === defaultAddressId}
          onChange={() => handleDefaultChange(addressId)}
        />
      }
      label={`Default ${type} address`}
    />
    <IconButton
      aria-label="delete"
      onClick={() => handleDeleteAddress(addressId, type)}
      className={styles.deleteButton}>
      <DeleteIcon color="error" />
    </IconButton>
  </div>
);

export default AddressActions;
