import React, { FC } from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { client } from '@config/constants';
import PasswordInputComponent from '@components/password-input-component/password-input-component';
import styles from './user-profile-password.module.scss';

const BoldUppercaseError: FC<{ name: string }> = ({ name }) => (
  <ErrorMessage name={name} render={msg => <span className={styles.errorMessage}>{msg}</span>} />
);

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().required('New password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm new password is required'),
});

interface PasswordChangeFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export const PasswordChangeForm: FC<PasswordChangeFormProps> = ({ onCancel, onSuccess }) => {
  const handlePasswordChangeSubmit = async (
    values: { currentPassword: string; newPassword: string; confirmNewPassword: string },
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    try {
      const response = await client.getClient().me().get().execute();
      const customerVersion = response.body.version;
      const customerId = response.body.id;

      await client
        .getClient()
        .customers()
        .password()
        .post({
          body: {
            id: customerId,
            version: customerVersion,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        })
        .execute();

      toast.success('Password successfully updated!');
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update password!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Typography gutterBottom variant="subtitle1" className={styles.sectionHeader}>
        Change Password
      </Typography>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => handlePasswordChangeSubmit(values, setSubmitting)}>
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} className={styles.passwordsContainer}>
                <Field
                  as={TextField}
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  fullWidth
                  component={PasswordInputComponent}
                  error={touched.currentPassword && Boolean(errors.currentPassword)}
                  helperText={
                    touched.currentPassword && <BoldUppercaseError name="currentPassword" />
                  }
                />
                <Field
                  as={TextField}
                  label="New Password"
                  name="newPassword"
                  type="password"
                  fullWidth
                  component={PasswordInputComponent}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={touched.newPassword && <BoldUppercaseError name="newPassword" />}
                />
                <Field
                  as={TextField}
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  type="password"
                  fullWidth
                  component={PasswordInputComponent}
                  error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
                  helperText={
                    touched.confirmNewPassword && <BoldUppercaseError name="confirmNewPassword" />
                  }
                />
              </Grid>
              <Grid item xs={12} className={styles.buttonContainer}>
                <Button type="submit" variant="outlined" disabled={isSubmitting}>
                  Save Changes
                </Button>
                <Button onClick={onCancel} variant="outlined">
                  Back to Profile
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};
