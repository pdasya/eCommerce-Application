import React, { FC } from 'react';
import { Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IMember } from '../interface/about-interface';
import styles from './member-card.module.scss';

export const MemberCard: FC<IMember> = ({ name, role, bio, photoUrl, githubLink }) => (
  <Card className={styles.card}>
    <CardMedia component="img" alt={name} image={photoUrl} className={styles.cardPhoto} />
    <CardContent>
      <Typography gutterBottom variant="h6" component="h6" className={styles.cardName}>
        {name}
      </Typography>
      <Typography variant="body1" className={styles.cardRole}>
        {role}
      </Typography>
      <Typography variant="body2" className={styles.cardBio}>
        {bio}
      </Typography>
    </CardContent>

    <CardContent className={styles.cardText}>
      <Link
        href={githubLink}
        underline="none"
        aria-label={name}
        target="_blank"
        className={styles.link}>
        <GitHubIcon />
      </Link>
    </CardContent>
  </Card>
);
