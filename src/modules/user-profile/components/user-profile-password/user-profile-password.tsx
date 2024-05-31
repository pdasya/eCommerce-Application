import React, { FC } from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { client, saveStorage, tokenCache, tokenName } from '@config/constants';
import PasswordInputComponent from '@components/password-input-component/password-input-component';
import { useAppDispatch } from '@hooks/use-app-dispatch.hook';
import { authorize } from '@store/auth/auth.slice';
import styles from './user-profile-password.module.scss';
import { baseSchema } from '@config/validation-schema';

interface IUserDraft {
  email: string;
  password: string;
}

const BoldUppercaseError: FC<{ name: string }> = ({ name }) => (
  <ErrorMessage name={name} render={msg => <span className={styles.errorMessage}>{msg}</span>} />
);

const validationSchema = Yup.object({
  currentPassword: baseSchema.password,
  newPassword: baseSchema.password,
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'The password must be the same as the new password')
    .required('Confirm new password is required'),
});

interface PasswordChangeFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export const PasswordChangeForm: FC<PasswordChangeFormProps> = ({ onCancel, onSuccess }) => {
  const dispatch = useAppDispatch();
  const handlePasswordChangeSubmit = async (
    values: { currentPassword: string; newPassword: string; confirmNewPassword: string },
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    try {
      const response = await client.getClient().me().get().execute();
      const customerVersion = response.body.version;
      const customerId = response.body.id;
      const customerEmail = response.body.email;

      const userDraft: IUserDraft = {
        email: customerEmail,
        password: values.newPassword,
      };

      await client
        .getClient()
        .me()
        .password()
        .post({
          body: {
            version: customerVersion,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        })
        .execute()
        .then(() => tokenCache.delete());

      await client
        .passwordSession(userDraft)
        .me()
        .login()
        .post({
          body: userDraft,
        })
        .execute()
        .then(() => {
          dispatch(
            authorize({
              id: customerId,
              email: customerEmail,
            }),
          );
          saveStorage.set(tokenName, tokenCache.get());
        });

      toast.success('Password successfully updated!');
      onSuccess();
    } catch (error) {
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
