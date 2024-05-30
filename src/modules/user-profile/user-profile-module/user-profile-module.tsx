import React, { FC, useEffect, useState } from 'react';
import { Typography, Grid, Avatar, Divider, Paper, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { client } from '@config/constants';
import { baseSchemaUser } from '@config/validation-schema';
import { ValidationError } from 'yup';
import { Address } from '@commercetools/platform-sdk';
import styles from './user-profile-module.module.scss';
import { fetchUserData } from '../user-profile-api/fetch-user-data';
import UserProfileList from '../components/user-profile-list/user-profile-list';
import {
  MyCustomerUpdateAction,
  Errors,
  PersonalUserData,
  AddressErrors,
} from '../interfaces/user-profile.interfaces';
import { PasswordChangeForm } from '../components/user-profile-password/user-profile-password';

const initialValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  shippingStreet: '',
  shippingAddresses: [],
  billingAddresses: [],
};

export const UserProfileModule: FC = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    shippingAddresses: [],
    defaultShippingAddressId: '',
    billingAddresses: [],
    defaultBillingAddressId: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [userErrors, setUserErrors] = useState<Errors>(initialValues);

  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);

  const validateData = async () => {
    const newErrors: Errors = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      shippingAddresses: userData.shippingAddresses.map(() => ({
        streetName: '',
        city: '',
        postalCode: '',
        country: '',
      })),
      billingAddresses: userData.billingAddresses.map(() => ({
        streetName: '',
        city: '',
        postalCode: '',
        country: '',
      })),
    };

    try {
      await baseSchemaUser.validate(userData, { abortEarly: false });
      setUserErrors(newErrors);
      return true;
    } catch (err) {
      if (err instanceof ValidationError) {
        const updatedErrors = { ...newErrors };
        err.inner.forEach(validationError => {
          if (validationError.path) {
            const pathParts = validationError.path.split('.');
            if (pathParts.length === 1) {
              updatedErrors[
                pathParts[0] as keyof Omit<Errors, 'shippingAddresses' | 'billingAddresses'>
              ] = validationError.message;
            } else if (pathParts.length === 2) {
              const addressType = pathParts[0].slice(0, pathParts[0].indexOf('[')) as
                | 'shippingAddresses'
                | 'billingAddresses';
              const match = pathParts[0].match(/\d+/);
              const index = match ? parseInt(match[0], 10) : 0;
              const field = pathParts[1] as keyof AddressErrors;
              if (updatedErrors[addressType] && updatedErrors[addressType][index]) {
                updatedErrors[addressType][index][field] = validationError.message;
              }
            }
          }
        });
        setUserErrors(updatedErrors);
        console.log(updatedErrors);
      }
      return false;
    }
  };

  const createUpdateActions = (data: PersonalUserData): MyCustomerUpdateAction[] => {
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

    data.shippingAddresses.forEach((address: Address) => {
      actions.push({
        action: 'changeAddress',
        addressId: address.id!,
        address: {
          streetName: address.streetName!,
          city: address.city!,
          postalCode: address.postalCode!,
          country: address.country,
        },
      });
    });

    data.billingAddresses.forEach((address: Address) => {
      actions.push({
        action: 'changeAddress',
        addressId: address.id!,
        address: {
          streetName: address.streetName!,
          city: address.city!,
          postalCode: address.postalCode!,
          country: address.country,
        },
      });
    });
    return actions;
  };

  const handleDataChange = (path: string) => (value: string) => {
    setUserData(prevData => {
      const newData = { ...prevData };
      const keys = path.split('.');

      let current: any = newData;
      for (let i = 0; i < keys.length - 1; i += 1) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

      return newData;
    });
  };

  useEffect(() => {
    fetchUserData(setUserData);
  }, []);

  const handleEditClick = async () => {
    const newErrors: Errors = initialValues;
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
