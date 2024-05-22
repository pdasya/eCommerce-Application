import React, { FC, useEffect, useState } from 'react';
import { client } from '@config/constants';
import {
  Typography,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import styles from './user-profile-module.module.scss';

export const UserProfileModule: FC = () => {
  // const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getClient().me().get().execute();
        // setEmail(response.body.email);
        setFirstName(response.body.firstName!);
        setLastName(response.body.lastName!);
        setDateOfBirth(response.body.dateOfBirth!);
      } catch (error) {
        console.log(error);
        // setEmail('Failed to load email');
        setFirstName('Failed to load first name');
        setLastName('Failed to load last name');
        setDateOfBirth('Failed to load date of birth');
      }
    };

    fetchData();
  }, []);

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <Avatar
            src="https://png.klev.club/uploads/posts/2024-04/png-klev-club-3ngo-p-totoro-png-27.png"
            sx={{ width: 80, height: 80 }}
            alt="Profile Photo"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography gutterBottom variant="h4" component="div">
            {firstName} {lastName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" className={styles.sectionHeader}>
              Personal Information
            </Typography>
          </Grid>
          <List>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <Grid container alignItems="center" direction={isSmallScreen ? 'column' : 'row'}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={styles.fieldName}>
                    First Name
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">{firstName}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <Grid container alignItems="center" direction={isSmallScreen ? 'column' : 'row'}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={styles.fieldName}>
                    Last Name
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">{lastName}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            {/* <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <Grid container alignItems="center" direction={isSmallScreen ? 'column' : 'row'}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={styles.fieldName}>Email</Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">{email}</Typography>
                </Grid>
              </Grid>
            </ListItem> */}
            <ListItem>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <Grid container alignItems="center" direction={isSmallScreen ? 'column' : 'row'}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={styles.fieldName}>
                    Date of Birth
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">{dateOfBirth}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};
