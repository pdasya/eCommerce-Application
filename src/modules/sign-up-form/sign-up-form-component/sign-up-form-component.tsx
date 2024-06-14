import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import { Button, Paper, Typography, Grid, Divider } from '@mui/material';
import * as Yup from 'yup';
import { baseSchema, billingSchema } from '@config/validation-schema';
import FieldComponent from '../components/field-component/field-component';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@/routes';
import * as styles from './sign-up-form-component.module.scss';

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
  let schema = Yup.object().shape(baseSchema);

  if (!values.setSameBillingAddress) {
    schema = schema.concat(Yup.object().shape(billingSchema));
  }

  return schema;
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
      onSubmit={async values => {
        await onSubmit(values);
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
