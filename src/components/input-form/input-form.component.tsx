import React, { FC, useState } from 'react';
import { Formik, Field, Form, FieldProps, ErrorMessage } from 'formik';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import * as styles from './input-form.component.module.scss';

interface IFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: { label: string; value: string }[]; // For select input
}

interface IFormTemplateProperties {
  title: string;
  buttonText: string;
  fields: IFormField[];
  initialValues: Record<string, string>;
  validationSchema: Yup.ObjectSchema<Record<string, string | Date>>;
  onSubmit: (values: Record<string, string>) => void;
}

const PasswordInputComponent: FC<FieldProps> = ({ field, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = (): void => setShowPassword(show => !show);
  return (
    <FormControl className={styles.passwordInput}>
      <Field
        {...props}
        as={TextField}
        type={showPassword ? 'text' : 'password'}
        name={field.name}
        variant="standard"
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

export const FormTemplate: FC<IFormTemplateProperties> = ({
  title,
  buttonText,
  fields,
  initialValues,
  validationSchema,
  onSubmit,
}) => (
  <Paper
    elevation={3}
    style={{
      padding: 20,
      maxWidth: 400,
      margin: '20px auto',
      border: '2px solid black',
    }}>
    <Typography variant="h2" align="center" gutterBottom>
      {title}
    </Typography>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            {fields.map(field => (
              <Grid item xs={12} key={field.id}>
                {field.type === 'select' ? (
                  <FormControl fullWidth variant="standard">
                    <InputLabel required={field.required}>{field.label}</InputLabel>
                    <Field
                      as={Select}
                      name={field.name}
                      label={field.label}
                      required={field.required}
                      error={touched[field.name] && Boolean(errors[field.name])}>
                      {field.options?.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                    {touched[field.name] && <BoldUppercaseError name={field.name} />}
                  </FormControl>
                ) : field.type === 'password' ? (
                  <FormControl fullWidth variant="standard">
                    <Field
                      as={TextField}
                      fullWidth
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      variant="standard"
                      error={touched[field.name] && Boolean(errors[field.name])}
                      helperText={touched[field.name] && <BoldUppercaseError name={field.name} />}
                      component={PasswordInputComponent}
                    />
                  </FormControl>
                ) : (
                  <Field
                    as={TextField}
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    variant="standard"
                    error={touched[field.name] && Boolean(errors[field.name])}
                    helperText={touched[field.name] && <BoldUppercaseError name={field.name} />}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}>
            {buttonText}
          </Button>
        </Form>
      )}
    </Formik>
  </Paper>
);
