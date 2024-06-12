import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import styles from './about-module.module.scss';
import { IMember } from '../interface/about-interface';
import { MemberCard } from '../components/member-card';

export const AboutContent: FC = () => {
  const members: IMember[] = [
    {
      name: 'Daria',
      role: 'TeamLead & Frontend Developer',
      bio: 'I am a novice front-end developer passionate about crafting digital experiences. My journey into the world of web development started about a year ago with a fascination for coding and a thirst for creativity and visualization. I find endless joy in being part of projects, collaborating with team members, and continuous investigating of new technologies.',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg',
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
      bio: "My name is Aleksei, I'm 35 years old and I'm a front-end developer. My journey in web development began with self-study in 2017. To this day, I continue my journey as a web developer, and every day is an opportunity for me to learn something new and improve my skills.",
      photoUrl: './assets/images/photo/aleksei.jpg',
      githubLink: 'https://github.com/nicealx',
    },
  ];
  return (
    <>
      <Typography variant="h1" component="h1" className={styles.title}>
        About Us
      </Typography>
      <Box sx={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <p>
          We&apos;re a team of web developers, united by a common goal: to create an e-Commerce
          application. This project is not only our first experience of collaboration but also our
          first try into React development.
        </p>
        <p>
          Our journey into React development has been both challenging and rewarding. As we dove
          into the intricacies of React components and hooks, we found ourselves continuously
          learning and adapting to new methodologies. Also, this project has allowed us to
          experiment with state management techniques, pushing our development skills to new
          heights.
        </p>
      </Box>
      <Box sx={{ textAlign: 'center', maxWidth: 800, margin: '20px auto' }}>
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
    </>
  );
};
