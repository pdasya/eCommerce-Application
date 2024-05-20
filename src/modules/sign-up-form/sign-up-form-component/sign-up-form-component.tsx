import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import { Button, Paper, Typography, Grid, Divider } from '@mui/material';
import * as Yup from 'yup';
import styles from './sign-up-form-component.module.scss';
import FieldComponent from '../components/field-component/field-component';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@/routes';

export interface IFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: { label: string; value: string }[]; // For select input
}

interface ISignUpFormComponentProperties {
  title: string;
  buttonText: string;
  fields: IFormField[];
  initialValues: Record<string, string | boolean>;
  onSubmit: (values: Record<string, string | boolean>) => void;
}

const LinkToLoginPage: FC = () => (
  <CustomRouterLink to={RoutePath.signIn} className={styles.loginLink}>
    Already have an account? Login
  </CustomRouterLink>
);

export const getValidationSchema = (values: Record<string, string | boolean>) => {
  const minPasswordLength = 8;
  const minStreetNameLength = 1;
  const minAge = 13;

  const baseSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(minPasswordLength, `Password must be at least ${minPasswordLength} characters long`)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      )
      .required('Password is required'),
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'First name must contain only alphabetic characters')
      .required('First name is required'),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Last name must contain only alphabetic characters')
      .required('Last name is required'),
    dateOfBirth: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - minAge)),
        `You must be at least ${minAge} years old`,
      )
      .typeError('Date of birth is required')
      .required('Date of birth is required'),
    shippingStreet: Yup.string()
      .min(minStreetNameLength, 'Street must contain at least one character')
      .required('Street is required'),
    shippingCity: Yup.string()
      .matches(/^[A-Za-z]+$/, 'City must contain only alphabetic characters')
      .required('City is required'),
    shippingPostalCode: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, 'Postal code must be in the format 12345 or 12345-6789')
      .required('Postal code is required'),
    shippingCountry: Yup.string()
      .oneOf(['US'], 'Invalid country selection')
      .required('Country is required'),
  });

  const billingSchema = Yup.object().shape({
    billingStreet: Yup.string()
      .min(minStreetNameLength, 'Street must contain at least one character')
      .required('Billing street is required'),
    billingCity: Yup.string()
      .matches(/^[A-Za-z]+$/, 'City must contain only alphabetic characters')
      .required('Billing city is required'),
    billingPostalCode: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, 'Postal code must be in the format 12345 or 12345-6789')
      .required('Billing postal code is required'),
    billingCountry: Yup.string()
      .oneOf(['US'], 'Invalid country selection')
      .required('Billing country is required'),
  });

  return values.setSameBillingAddress ? baseSchema : baseSchema.concat(billingSchema);
};

const validate = (values: Record<string, string | boolean>) => {
  try {
    getValidationSchema(values).validateSync(values, { abortEarly: false });
    return {};
  } catch (err) {
    const errors: Record<string, string> = {};
    if (err.inner) {
      err.inner.forEach((error: Yup.ValidationError) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
    }
    return errors;
  }
};

export const SignUpFormComponent: FC<ISignUpFormComponentProperties> = ({
  title,
  buttonText,
  fields,
  initialValues,
  onSubmit,
}) => (
  <Paper elevation={3} className={styles.signUpForm}>
    <Typography variant="h2" align="center" gutterBottom>
      {title}
    </Typography>
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
      }}>
      {({ errors, touched, values }) => (
        <Form noValidate>
          <Grid container spacing={2}>
            {fields.map(field => {
              if (field.name === 'shippingStreet') {
                return (
                  <React.Fragment key={field.id}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" className={styles.shippingAddressHeader}>
                        Shipping Address
                      </Typography>
                      <Divider className={styles.shippingAddressDivider} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FieldComponent
                        field={field}
                        error={errors[field.name]}
                        touched={touched[field.name]}
                        values={values}
                      />
                    </Grid>
                  </React.Fragment>
                );
              }
              if (
                (field.name.includes('billing') || field.name.includes('DefaultBilling')) &&
                values.setSameBillingAddress
              ) {
                return null;
              }
              if (field.name === 'billingStreet') {
                return (
                  <React.Fragment key={field.id}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" className={styles.billingAddressHeader}>
                        Billing Address
                      </Typography>
                      <Divider className={styles.billingAddressDivider} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FieldComponent
                        field={field}
                        error={errors[field.name]}
                        touched={touched[field.name]}
                        values={values}
                      />
                    </Grid>
                  </React.Fragment>
                );
              }
              if (field.name === 'email') {
                return (
                  <React.Fragment key={field.id}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" className={styles.generalInfoHeader}>
                        General Information
                      </Typography>
                      <Divider className={styles.generalInfoDivider} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FieldComponent
                        field={field}
                        error={errors[field.name]}
                        touched={touched[field.name]}
                        values={values}
                      />
                    </Grid>
                  </React.Fragment>
                );
              }
              return (
                <Grid item xs={12} sm={6} key={field.id}>
                  <FieldComponent
                    field={field}
                    error={errors[field.name]}
                    touched={touched[field.name]}
                    values={values}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.submitButton}>
            {buttonText}
          </Button>
          <LinkToLoginPage />
        </Form>
      )}
    </Formik>
  </Paper>
);

export default SignUpFormComponent;
