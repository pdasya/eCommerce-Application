import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import { Button, Paper, Typography, Grid, Divider } from '@mui/material';
import * as Yup from 'yup';
import styles from './sign-up-form-component.module.scss';
import FieldComponent from '../components/field-component/field-component';

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
  validationSchema: Yup.ObjectSchema<Record<string, string | Date>>;
  onSubmit: (values: Record<string, string | boolean>) => void;
}

export const SignUpFormComponent: FC<ISignUpFormComponentProperties> = ({
  title,
  buttonText,
  fields,
  initialValues,
  validationSchema,
  onSubmit,
}) => (
  <Paper elevation={3} className={styles.signUpForm}>
    <Typography variant="h2" align="center" gutterBottom>
      {title}
    </Typography>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
      }}>
      {({ errors, touched }) => (
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
                    <Grid item xs={12}>
                      <FieldComponent
                        field={field}
                        error={errors[field.name]}
                        touched={touched[field.name]}
                      />
                    </Grid>
                  </React.Fragment>
                );
              }
              if (field.name === 'billingStreet') {
                return (
                  <React.Fragment key={field.id}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" className={styles.shippingAddressHeader}>
                        Billing Address
                      </Typography>
                      <Divider className={styles.shippingAddressDivider} />
                    </Grid>
                    <Grid item xs={12}>
                      <FieldComponent
                        field={field}
                        error={errors[field.name]}
                        touched={touched[field.name]}
                      />
                    </Grid>
                  </React.Fragment>
                );
              }
              return (
                <Grid item xs={12} key={field.id}>
                  <FieldComponent
                    field={field}
                    error={errors[field.name]}
                    touched={touched[field.name]}
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
        </Form>
      )}
    </Formik>
  </Paper>
);

export default SignUpFormComponent;
