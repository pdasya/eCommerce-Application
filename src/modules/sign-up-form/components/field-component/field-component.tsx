import React, { FC } from 'react';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  FormControlLabel,
  Switch,
} from '@mui/material';
import PasswordInputComponent from '@/components/password-input-component/password-input-component';
import styles from './field-component.module.scss';

interface IFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface FieldComponentProps {
  field: IFormField;
  error?: string;
  touched?: boolean;
}

const BoldUppercaseError: FC<{ name: string }> = ({ name }) => (
  <ErrorMessage
    name={name}
    render={msg => (
      <FormHelperText error className={styles.errorMessage}>
        {msg}
      </FormHelperText>
    )}
  />
);

const FieldComponent: React.FC<FieldComponentProps> = ({ field, error, touched }) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setFieldValue(field.name, checked);
  };

  const renderFieldInput = () => {
    switch (field.type) {
      case 'select':
        return (
          <>
            <InputLabel required={field.required}>{field.label}</InputLabel>
            <Field as={Select} name={field.name} label={field.label} required={field.required}>
              {field.options?.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
          </>
        );
      case 'password':
        return (
          <Field
            as={TextField}
            fullWidth
            label={field.label}
            name={field.name}
            type={field.type}
            required={field.required}
            variant="standard"
            component={PasswordInputComponent}
          />
        );
      case 'date':
        return (
          <Field
            as={TextField}
            fullWidth
            label={field.label}
            name={field.name}
            type={field.type}
            required={field.required}
            variant="standard"
            className={styles.dateOfBirthInput}
          />
        );
      case 'switch':
        return (
          <FormControlLabel
            label={field.label}
            name={field.name}
            control={<Switch onChange={handleChange} />}
            required={field.required}
          />
        );
      default:
        return (
          <Field
            as={TextField}
            fullWidth
            label={field.label}
            name={field.name}
            type={field.type}
            required={field.required}
            variant="standard"
          />
        );
    }
  };

  return (
    <FormControl fullWidth variant="standard" error={touched && Boolean(error)}>
      {renderFieldInput()}
      {touched && error ? <BoldUppercaseError name={field.name} /> : null}
    </FormControl>
  );
};

export default FieldComponent;
