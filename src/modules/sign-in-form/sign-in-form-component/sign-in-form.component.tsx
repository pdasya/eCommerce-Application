/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField, Button, Paper, Typography, Grid, FormControl } from '@mui/material';
import * as Yup from 'yup';
import PasswordInputComponent from '../../../components/password-input-component/password-input-component';
import styles from './sign-in-form.component.module.scss';
import { IUserDraft } from '@/modules/sign-in-form/interface/sign-in-form';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@/routes';

interface IFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
}

interface ISignInFormComponentProperties {
  title: string;
  buttonText: string;
  fields: IFormField[];
  initialValues: IUserDraft;
  validationSchema: Yup.ObjectSchema<IUserDraft>;
  onSubmit: (values: IUserDraft) => Promise<void>;
}

const BoldUppercaseError: FC<{ name: string }> = ({ name }) => (
  <ErrorMessage name={name} render={msg => <span className={styles.errorMessage}>{msg}</span>} />
);

const ButtonToRegisterPage: FC = () => (
  <CustomRouterLink to={RoutePath.signUp}>
    <Button className={styles.button} variant="contained" color="primary" fullWidth>
      Register
    </Button>
  </CustomRouterLink>
);

const SignInFormComponent: FC<ISignInFormComponentProperties> = ({
  title,
  buttonText,
  fields,
  initialValues,
  validationSchema,
  onSubmit,
}) => (
  <Paper elevation={3} className={styles.form}>
    <Typography variant="h2" align="center" gutterBottom>
      {title}
    </Typography>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: IUserDraft) => onSubmit(values)}>
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            {fields.map(field => (
              <Grid item xs={12} key={field.id}>
                <FormControl fullWidth>
                  <Field
                    as={TextField}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    variant="standard"
                    autoComplete="on"
                    error={touched[field.name] && Boolean(errors[field.name])}
                    helperText={touched[field.name] && <BoldUppercaseError name={field.name} />}
                    component={field.type === 'password' ? PasswordInputComponent : null}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>
          <Button
            className={styles.button}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth>
            {buttonText}
          </Button>
          <ButtonToRegisterPage />
        </Form>
      )}
    </Formik>
  </Paper>
);

export default SignInFormComponent;
