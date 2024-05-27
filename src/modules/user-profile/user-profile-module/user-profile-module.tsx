import React, { FC, useEffect, useState } from 'react';
import { Typography, Grid, Avatar, Divider, Paper, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { client } from '@config/constants';
import { baseSchema, baseSchemaUser } from '@config/validation-schema';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import { Form } from 'react-router-dom';
import PasswordInputComponent from '@components/password-input-component/password-input-component';
import styles from './user-profile-module.module.scss';
import { fetchUserData } from '../user-profile-api/fetch-user-data';
import UserProfileList from '../components/user-profile-list/user-profile-list';
// import { PasswordChangeForm } from '../components/user-profile-password/user-profile-password';
import { MyCustomerUpdateAction, Errors } from '../interfaces/user-profile.interfaces';

const BoldUppercaseError: FC<{ name: string }> = ({ name }) => (
  <ErrorMessage name={name} render={msg => <span className={styles.errorMessage}>{msg}</span>} />
);

export const UserProfileModule: FC = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    shippingStreet: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: '',
    isShippingAddressDefault: false,
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
    isBillingAddressDefault: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [userErrors, setUserErrors] = useState<Errors>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
  });

  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
  // const [currentPassword, setCurrentPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const validateData = async () => {
    const newErrors: Errors = { firstName: '', lastName: '', dateOfBirth: '', email: '' };

    try {
      await Yup.object(baseSchemaUser).validate(userData, { abortEarly: false });
      setUserErrors(newErrors);
      return true;
    } catch (err) {
      if (err instanceof ValidationError) {
        err.inner.forEach(validationError => {
          if (validationError.path) {
            newErrors[validationError.path as keyof Errors] = validationError.message;
          }
        });
      }
      setUserErrors(newErrors);
      return false;
    }
  };

  const createUpdateActions = (data: typeof userData): MyCustomerUpdateAction[] => {
    const actions: MyCustomerUpdateAction[] = [];
    if (data.firstName) {
      actions.push({ action: 'setFirstName', firstName: data.firstName });
    }
    if (data.lastName) {
      actions.push({ action: 'setLastName', lastName: data.lastName });
    }
    if (data.email) {
      actions.push({ action: 'changeEmail', email: data.email });
    }
    if (data.dateOfBirth) {
      actions.push({ action: 'setDateOfBirth', dateOfBirth: data.dateOfBirth });
    }
    return actions;
  };

  const handleDataChange = (field: keyof typeof userData) => (value: string) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    fetchUserData(setUserData);
  }, []);

  const handleEditClick = async () => {
    const newErrors: Errors = { firstName: '', lastName: '', dateOfBirth: '', email: '' };
    setUserErrors(newErrors);

    if (!editMode) {
      setEditMode(true);
    } else if (await validateData()) {
      const updateActions = createUpdateActions(userData);
      try {
        const response = await client.getClient().me().get().execute();
        const customerVersion = response.body.version;

        await client
          .getClient()
          .me()
          .post({
            body: {
              version: customerVersion,
              actions: updateActions,
            },
          })
          .execute();

        toast.success(`Form successfully updated!`);
        setEditMode(false);
      } catch (error) {
        console.error(error);
        toast.error(`Failed to update form!`);
      }
    } else {
      toast.error(`Please correct the errors in the form`);
    }
  };

  const handlePasswordChangeClick = () => {
    setIsPasswordChangeMode(true);
  };

  const handleBackToProfileClick = () => {
    setIsPasswordChangeMode(false);
  };

  const validationSchema = Yup.object({
    currentPassword: baseSchema.password,
    newPassword: baseSchema.password,
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Password must be similar to new password')
      .required('Password is required'),
  });

  return (
    <Paper elevation={3} className={styles.paperContainer}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <Avatar
            src="https://png.klev.club/uploads/posts/2024-04/png-klev-club-3ngo-p-totoro-png-27.png"
            className={styles.profileAvatar}
            alt="Profile Photo"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography gutterBottom variant="h4">
            {userData.firstName} {userData.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12}>
          {!isPasswordChangeMode ? (
            <UserProfileList
              userData={userData}
              errors={userErrors}
              editMode={editMode}
              handleDataChange={handleDataChange}
            />
          ) : (
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
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const response = await client.getClient().me().get().execute();
                    console.log(values);
                    console.log(response);
                    // const customerVersion = response.body.version;

                    // await client
                    //   .getClient()
                    //   .me()
                    //   .post({
                    //     body: {
                    //       version: customerVersion,
                    //       actions: [{ action: 'setPassword', password: values.newPassword }],
                    //     },
                    //   })
                    //   .execute();

                    toast.success('Password successfully updated!');
                    setIsPasswordChangeMode(false);
                  } catch (error) {
                    console.error(error);
                    toast.error('Failed to update password!');
                  } finally {
                    setSubmitting(false);
                  }
                }}>
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
                          helperText={
                            touched.newPassword && <BoldUppercaseError name="newPassword" />
                          }
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
                            touched.confirmNewPassword && (
                              <BoldUppercaseError name="confirmNewPassword" />
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} className={styles.buttonContainer}>
                        <Button type="submit" variant="outlined" disabled={isSubmitting}>
                          Save Changes
                        </Button>
                        <Button onClick={handleBackToProfileClick} variant="outlined">
                          Back to Profile
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </Grid>
      </Grid>

      <Grid item className={styles.buttonContainer}>
        {!isPasswordChangeMode && (
          <>
            <Button onClick={handleEditClick} variant="outlined">
              {editMode ? 'Save Changes' : 'Edit Your Information'}
            </Button>
            <Button onClick={handlePasswordChangeClick} variant="outlined">
              Change your password
            </Button>
          </>
        )}
      </Grid>
    </Paper>
  );
};
