import React, { FC, useEffect, useState } from 'react';
import { Typography, Grid, Avatar, Divider, Paper, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { client } from '@config/constants';
import { baseSchemaUser } from '@config/validation-schema';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import styles from './user-profile-module.module.scss';
import { fetchUserData } from '../user-profile-api/fetch-user-data';
import UserProfileList from '../components/user-profile-list/user-profile-list';
// import { PasswordChangeForm } from '../components/user-profile-password/user-profile-password';
import { MyCustomerUpdateAction, Errors } from '../interfaces/user-profile.interfaces';

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
  const [errors, setErrors] = useState<Errors>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
  });

  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
  const [password, setPassword] = useState('');

  const validateData = async () => {
    const newErrors: Errors = { firstName: '', lastName: '', dateOfBirth: '', email: '' };

    try {
      await Yup.object(baseSchemaUser).validate(userData, { abortEarly: false });
      setErrors(newErrors);
      return true;
    } catch (err) {
      if (err instanceof ValidationError) {
        err.inner.forEach(validationError => {
          if (validationError.path) {
            newErrors[validationError.path as keyof Errors] = validationError.message;
          }
        });
      }
      setErrors(newErrors);
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
    setErrors(newErrors);

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

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

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
              errors={errors}
              editMode={editMode}
              handleDataChange={handleDataChange}
            />
          ) : (
            <div>
              <Typography gutterBottom variant="h5">
                Change Password
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleEditClick} variant="outlined">
                    {editMode ? 'Save Changes' : 'Edit Your Information'}
                  </Button>
                  <Button onClick={handleBackToProfileClick} variant="outlined">
                    Back to Profile
                  </Button>
                </Grid>
              </Grid>
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
