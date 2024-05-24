import React, { FC, useEffect, useState } from 'react';
import { Typography, Grid, Avatar, Divider, Paper, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { client } from '@config/constants';
import { baseSchemaUser } from '@config/validation-schema';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import styles from './user-profile-module.module.scss';
import { fetchUserData } from '../user-profile-api/fetch-user-data';
import UserProfileList, { Errors } from '../components/user-profile-list/user-profile-list';

interface MyCustomerSetFirstNameAction {
  action: 'setFirstName';
  firstName: string;
}

interface MyCustomerSetLastNameAction {
  action: 'setLastName';
  lastName: string;
}

interface MyCustomerSetEmailAction {
  action: 'changeEmail';
  email: string;
}

interface MyCustomerSetDateOfBirthAction {
  action: 'setDateOfBirth';
  dateOfBirth: string;
}

type MyCustomerUpdateAction =
  | MyCustomerSetFirstNameAction
  | MyCustomerSetLastNameAction
  | MyCustomerSetEmailAction
  | MyCustomerSetDateOfBirthAction;

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

  const handleClick = async () => {
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
          <UserProfileList
            userData={userData}
            errors={errors}
            editMode={editMode}
            handleDataChange={handleDataChange}
          />
        </Grid>
      </Grid>

      <Grid item>
        <Button onClick={handleClick} variant="outlined">
          {editMode ? 'Save Changes' : 'Edit Your Information'}
        </Button>
      </Grid>
    </Paper>
  );
};

// import React, { FC, useEffect, useState } from 'react';
// import {
//   Typography,
//   Grid,
//   Avatar,
//   Divider,
//   List,
//   ListItem,
//   ListItemIcon,
//   Paper,
//   SvgIconProps,
//   FormControlLabel,
//   Checkbox,
//   TextField,
//   Button,
//   MenuItem,
//   Select,
// } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
// import PublicIcon from '@mui/icons-material/Public';
// import EmailIcon from '@mui/icons-material/Email';
// import { toast } from 'react-toastify';
// import { client } from '@config/constants';
// import { baseSchemaUser } from '@config/validation-schema';
// import * as Yup from 'yup';
// import { ValidationError } from 'yup';
// import styles from './user-profile-module.module.scss';
// import { fetchUserData } from '../user-profile-api/fetch-user-data';

// interface InfoItemProps {
//   icon: React.ComponentType<SvgIconProps>;
//   label: string;
//   value: string;
// }

// interface EditableInfoItemProps extends InfoItemProps {
//   editMode: boolean;
//   onChange: (value: string) => void;
//   type?: string;
//   options?: string[];
//   error?: string;
// }

// interface MyCustomerSetFirstNameAction {
//   action: 'setFirstName';
//   firstName: string;
// }

// interface MyCustomerSetLastNameAction {
//   action: 'setLastName';
//   lastName: string;
// }

// interface MyCustomerSetEmailAction {
//   action: 'changeEmail';
//   email: string;
// }

// interface MyCustomerSetDateOfBirthAction {
//   action: 'setDateOfBirth';
//   dateOfBirth: string;
// }

// interface Errors {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   email: string;
// }

// type MyCustomerUpdateAction =
//   | MyCustomerSetFirstNameAction
//   | MyCustomerSetLastNameAction
//   | MyCustomerSetEmailAction
//   | MyCustomerSetDateOfBirthAction;

// const EditableInfoItem: React.FC<EditableInfoItemProps> = ({
//   icon: Icon,
//   label,
//   value,
//   editMode,
//   onChange,
//   type = 'text',
//   options = [],
//   error,
// }) => (
//   <ListItem>
//     <ListItemIcon>
//       <Icon />
//     </ListItemIcon>
//     <Grid container alignItems="center">
//       <Grid item xs>
//         <Typography variant="subtitle1" className={styles.fieldName}>
//           {label}
//         </Typography>
//       </Grid>
//       <Grid item xs>
//         {editMode ? (
//           type === 'select' ? (
//             <Select
//               value={value}
//               onChange={e => onChange(e.target.value)}
//               fullWidth
//               variant="outlined">
//               {options.map(option => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           ) : (
//             <TextField
//               fullWidth
//               variant="outlined"
//               value={value}
//               onChange={e => onChange(e.target.value)}
//               type={type}
//               error={!!error}
//               helperText={error}
//             />
//           )
//         ) : (
//           <Typography variant="subtitle1">{value}</Typography>
//         )}
//       </Grid>
//     </Grid>
//   </ListItem>
// );

// export const UserProfileModule: FC = () => {
//   const [userData, setUserData] = useState({
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     email: '',
//     shippingStreet: '',
//     shippingCity: '',
//     shippingPostalCode: '',
//     shippingCountry: '',
//     isShippingAddressDefault: false,
//     billingStreet: '',
//     billingCity: '',
//     billingPostalCode: '',
//     billingCountry: '',
//     isBillingAddressDefault: false,
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [errors, setErrors] = useState({
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     email: '',
//   });

//   const validateData = async () => {
//     const newErrors: Errors = { firstName: '', lastName: '', dateOfBirth: '', email: '' };

//     try {
//       await Yup.object(baseSchemaUser).validate(userData, { abortEarly: false });
//       setErrors(newErrors);
//       return true;
//     } catch (err) {
//       if (err instanceof ValidationError) {
//         err.inner.forEach(validationError => {
//           if (validationError.path) {
//             newErrors[validationError.path as keyof Errors] = validationError.message;
//           }
//         });
//       }
//       setErrors(newErrors);
//       return false;
//     }
//   };
//   const createUpdateActions = (data: typeof userData): MyCustomerUpdateAction[] => {
//     const actions: MyCustomerUpdateAction[] = [];
//     if (data.firstName) {
//       actions.push({ action: 'setFirstName', firstName: data.firstName });
//     }
//     if (data.lastName) {
//       actions.push({ action: 'setLastName', lastName: data.lastName });
//     }
//     if (data.email) {
//       actions.push({ action: 'changeEmail', email: data.email });
//     }
//     if (data.dateOfBirth) {
//       actions.push({ action: 'setDateOfBirth', dateOfBirth: data.dateOfBirth });
//     }
//     return actions;
//   };

//   const handleDataChange = (field: keyof typeof userData) => (value: string) => {
//     setUserData(prevData => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   useEffect(() => {
//     fetchUserData(setUserData);
//   }, []);

//   const handleClick = async () => {
//     const newErrors = { firstName: '', lastName: '', dateOfBirth: '', email: '' };
//     setErrors(newErrors);

//     if (!editMode) {
//       setEditMode(true);
//     } else if (await validateData()) {
//       const updateActions = createUpdateActions(userData);
//       try {
//         const response = await client.getClient().me().get().execute();
//         const customerVersion = response.body.version;

//         await client
//           .getClient()
//           .me()
//           .post({
//             body: {
//               version: customerVersion,
//               actions: updateActions,
//             },
//           })
//           .execute();

//         toast.success(`Form successfully updated!`);
//         setEditMode(false);
//       } catch (error) {
//         console.error(error);
//         toast.error(`Failed to update form!`);
//       }
//     } else {
//       toast.error(`Please correct the errors in the form`);
//     }
//   };

//   return (
//     <Paper elevation={3} className={styles.paperContainer}>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12} sm={3}>
//           <Avatar
//             src="https://png.klev.club/uploads/posts/2024-04/png-klev-club-3ngo-p-totoro-png-27.png"
//             className={styles.profileAvatar}
//             alt="Profile Photo"
//           />
//         </Grid>
//         <Grid item xs={12} sm={9}>
//           <Typography gutterBottom variant="h4">
//             {userData.firstName} {userData.lastName}
//           </Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Divider variant="middle" />
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="subtitle1" className={styles.sectionHeader}>
//             Personal Information
//           </Typography>
//           <List>
//             <EditableInfoItem
//               icon={PersonIcon}
//               label="First Name"
//               value={userData.firstName}
//               editMode={editMode}
//               onChange={handleDataChange('firstName')}
//               error={errors.firstName}
//             />
//             <EditableInfoItem
//               icon={PersonIcon}
//               label="Last Name"
//               value={userData.lastName}
//               editMode={editMode}
//               onChange={handleDataChange('lastName')}
//               error={errors.lastName}
//             />
//             <EditableInfoItem
//               icon={EmailIcon}
//               label="Email"
//               value={userData.email}
//               editMode={editMode}
//               onChange={handleDataChange('email')}
//               error={errors.email}
//             />
//             <EditableInfoItem
//               icon={DateRangeIcon}
//               label="Date Of Birth"
//               value={userData.dateOfBirth}
//               editMode={editMode}
//               onChange={handleDataChange('dateOfBirth')}
//               type="date"
//               error={errors.dateOfBirth}
//             />
//           </List>
//           <Typography variant="subtitle1" className={styles.sectionHeader}>
//             Shipping Address
//           </Typography>
//           <List>
//             <EditableInfoItem
//               icon={LocationOnIcon}
//               label="Street"
//               value={userData.shippingStreet}
//               editMode={editMode}
//               onChange={handleDataChange('shippingStreet')}
//             />
//             <EditableInfoItem
//               icon={LocationCityIcon}
//               label="City"
//               value={userData.shippingCity}
//               editMode={editMode}
//               onChange={handleDataChange('shippingCity')}
//             />
//             <EditableInfoItem
//               icon={MarkunreadMailboxIcon}
//               label="Postal Code"
//               value={userData.shippingPostalCode}
//               editMode={editMode}
//               onChange={handleDataChange('shippingPostalCode')}
//             />
//             <EditableInfoItem
//               icon={PublicIcon}
//               label="Country"
//               value={userData.shippingCountry}
//               editMode={editMode}
//               onChange={handleDataChange('shippingCountry')}
//               type="select"
//               options={['US', 'Canada']}
//             />
//             <ListItem>
//               <FormControlLabel
//                 control={<Checkbox checked={userData.isShippingAddressDefault} />}
//                 label="Default shipping address"
//                 disabled
//               />
//             </ListItem>
//           </List>
//           <Typography variant="subtitle1" className={styles.sectionHeader}>
//             Billing Address
//           </Typography>
//           <List>
//             <EditableInfoItem
//               icon={LocationOnIcon}
//               label="Street"
//               value={userData.billingStreet}
//               editMode={editMode}
//               onChange={handleDataChange('billingStreet')}
//             />
//             <EditableInfoItem
//               icon={LocationCityIcon}
//               label="City"
//               value={userData.billingCity}
//               editMode={editMode}
//               onChange={handleDataChange('billingCity')}
//             />
//             <EditableInfoItem
//               icon={MarkunreadMailboxIcon}
//               label="Postal Code"
//               value={userData.billingPostalCode}
//               editMode={editMode}
//               onChange={handleDataChange('billingPostalCode')}
//             />
//             <EditableInfoItem
//               icon={PublicIcon}
//               label="Country"
//               value={userData.billingCountry}
//               editMode={editMode}
//               onChange={handleDataChange('billingCountry')}
//               type="select"
//               options={['US', 'Canada']}
//             />
//             <ListItem>
//               <FormControlLabel
//                 control={<Checkbox checked={userData.isBillingAddressDefault} />}
//                 label="Default billing address"
//                 disabled
//               />
//             </ListItem>
//           </List>
//         </Grid>
//       </Grid>

//       <Grid item>
//         <Button onClick={handleClick} variant="outlined">
//           {editMode ? 'Save Changes' : 'Edit Your Information'}
//         </Button>
//       </Grid>
//     </Paper>
//   );
// };
