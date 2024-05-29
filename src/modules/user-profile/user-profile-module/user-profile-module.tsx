import React, { FC, useEffect, useState } from 'react';
import { Typography, Grid, Avatar, Divider, Paper, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { client } from '@config/constants';
import { baseSchemaUser } from '@config/validation-schema';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import styles from './user-profile-module.module.scss';
import { fetchUserData } from '../user-profile-api/fetch-user-data';
import UserProfileList from '../components/user-profile-list/user-profile-list';
import { MyCustomerUpdateAction, Errors } from '../interfaces/user-profile.interfaces';
import { PasswordChangeForm } from '../components/user-profile-password/user-profile-password';

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
    shippingAddressId: '',
    isShippingAddressDefault: false,
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
    billingAddressId: '',
    isBillingAddressDefault: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [userErrors, setUserErrors] = useState<Errors>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    shippingStreet: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: '',
    shippingAddressId: '',
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
    billingAddressId: '',
  });

  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);

  const validateData = async () => {
    const newErrors: Errors = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      shippingStreet: '',
      shippingCity: '',
      shippingPostalCode: '',
      shippingCountry: '',
      shippingAddressId: '',
      billingStreet: '',
      billingCity: '',
      billingPostalCode: '',
      billingCountry: '',
      billingAddressId: '',
    };

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

    if (
      data.shippingStreet ||
      data.shippingCity ||
      data.shippingPostalCode ||
      data.shippingCountry
    ) {
      actions.push({
        action: 'changeAddress',
        addressId: data.shippingAddressId,
        address: {
          streetName: data.shippingStreet,
          city: data.shippingCity,
          postalCode: data.shippingPostalCode,
          country: data.shippingCountry,
        },
      });
    }

    if (data.billingStreet || data.billingCity || data.billingPostalCode || data.billingCountry) {
      actions.push({
        action: 'changeAddress',
        addressId: data.billingAddressId,
        address: {
          streetName: data.billingStreet,
          city: data.billingCity,
          postalCode: data.billingPostalCode,
          country: data.billingCountry,
        },
      });
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
    const newErrors: Errors = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      shippingStreet: '',
      shippingCity: '',
      shippingPostalCode: '',
      shippingCountry: '',
      shippingAddressId: '',
      billingStreet: '',
      billingCity: '',
      billingPostalCode: '',
      billingCountry: '',
      billingAddressId: '',
    };
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
            <PasswordChangeForm
              onCancel={handleBackToProfileClick}
              onSuccess={handleBackToProfileClick}
            />
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
