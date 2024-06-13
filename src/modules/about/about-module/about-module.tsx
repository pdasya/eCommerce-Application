import React, { FC } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import styles from './about-module.module.scss';
import { IMember } from '../interface/about-interface';
import { MemberCard } from '../components/member-card';

export const AboutContent: FC = () => {
  const members: IMember[] = [
    {
      name: 'Daria',
      role: 'TeamLead & Frontend Developer',
      bio: 'I am a novice front-end developer passionate about crafting digital experiences. My journey into the world of web development started about a year ago with a fascination for coding and a thirst for creativity and visualization. I find endless joy in being part of projects, collaborating with team members, and continuous investigating of new technologies.',
      photoUrl: './assets/images/photo/daria.jpg',
      githubLink: 'https://github.com/pdasya/',
    },
    {
      name: 'Timur',
      role: 'Frontend Developer',
      bio: 'In love with gardening, cats and mechanical keyboards. Crafting code and turning coffee into creativity ✨',
      photoUrl: './assets/images/photo/timur.jpeg',
      githubLink: 'https://github.com/jasper7466',
    },
    {
      name: 'Aleksei',
      role: 'Frontend Developer',
      bio: "I'm a front-end developer. My journey in web development began with self-study in 2017. To this day, I continue my journey as a web developer, and every day is an opportunity for me to learn something new and improve my skills.",
      photoUrl: './assets/images/photo/aleksei.jpg',
      githubLink: 'https://github.com/nicealx',
    },
  ];
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Paper className={styles.content}>
          <Typography variant="h1" component="h1" className={styles.aboutTitle}>
            About Us
          </Typography>
          <Box className={styles.about}>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              We&apos;re a team of web developers, united by a common goal: to create an e-Commerce
              application. This project is not only our first experience of collaboration but also
              our first try into React development.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Our journey into React development has been both challenging and rewarding. As we dove
              into the intricacies of React components and hooks, we found ourselves continuously
              learning and adapting to new methodologies. Also, this project has allowed us to
              experiment with state management techniques, pushing our development skills to new
              heights.
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item>
        <Paper className={styles.content}>
          <Box className={styles.title}>
            <Typography variant="h5" component="h5">
              Team Members
            </Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center" alignItems="stretch">
            {members.map(member => (
              <Grid item key={member.name} alignSelf="stretch">
                <MemberCard {...member} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Paper className={styles.content}>
          <Grid>
            <Box className={styles.title}>
              <Typography variant="h5" component="h5">
                Impact of collaboration
              </Typography>
            </Box>
            <Box className={styles.about}>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Although we three were strangers at the start of the project, this did not prevent
                us from quickly establishing a collaborative rapport. We quickly recognized each
                other&apos;s strengths and weaknesses, which helped us navigate through all the
                challenges of team development. The toughest part of the project involved grappling
                with the Commercetools platform and its SDK, often joking about the complexity and
                unpredictability of its documentation. However, over each iteration we developed
                more suitable and reusable solutions. This experience boosted our confidence in
                using Git and code review. You can check out the code for our application at the
                provided link.
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                We welcome and appreciate different viewpoints, so if you have any feedback or
                comments, please share them with us.
              </Typography>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
