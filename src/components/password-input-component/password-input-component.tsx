import React, { FC, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import { FormControl, TextField, InputAdornment, IconButton } from '@mui/material';
import { Field, FieldProps } from 'formik';
import { VisibilityOff } from '@mui/icons-material';
import styles from './password-input.component.module.scss';

const PasswordInputComponent: FC<FieldProps> = ({ field, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = (): void => setShowPassword(show => !show);
  return (
    <FormControl fullWidth className={styles.passwordInput}>
      <Field
        {...props}
        as={TextField}
        type={showPassword ? 'text' : 'password'}
        name={field.name}
      />
      <div className={styles.passwordIcon}>
        <InputAdornment position="end">
          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      </div>
    </FormControl>
  );
};

export default PasswordInputComponent;
