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
  ListItemText,
  Paper,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

export const UserProfileModule: FC = () => {
  const [email, setEmail] = useState<string>('Loading...');
  console.log(email);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await client.getClient().me().get().execute();
        setEmail(response.body.email);
      } catch (error) {
        console.log(error);
        setEmail('Failed to load email');
      }
    };

    fetchEmail();
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
            Name
          </Typography>
          <Typography color="text.secondary">Username</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12}>
          <List>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Username" secondary="{user.username}" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Email" secondary="{user.email}" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};
