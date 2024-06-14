import React, { FC } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField, Button, Paper, Typography, Grid, FormControl } from '@mui/material';
import PasswordInputComponent from '../../../components/password-input-component/password-input-component';
import { ISignInFormComponentProperties } from '@/modules/sign-in-form/interfaces/sign-in-form.interfaces';
import { CustomRouterLink } from '@/components/custom-router-link/custom-router-link.component';
import { RoutePath } from '@/routes';
import * as styles from './sign-in-form.component.module.scss';

const BoldUppercaseError: FC<{ name: string }> = ({ name }) => (
  <ErrorMessage name={name} render={msg => <span className={styles.errorMessage}>{msg}</span>} />
);

const LinkToRegisterPage: FC = () => (
  <CustomRouterLink to={RoutePath.signUp} className={styles.registerLink}>
    Don&apos;t have an account yet? Register
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
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form noValidate>
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
          <LinkToRegisterPage />
        </Form>
      )}
    </Formik>
  </Paper>
);

export default SignInFormComponent;
