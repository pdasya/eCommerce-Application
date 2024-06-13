import React, { FC, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import classNames from 'classnames';
import { Box } from '@mui/system';
import { IMember } from '../interface/about-interface';
import styles from './member-card.module.scss';

export const MemberCard: FC<IMember> = ({ name, role, bio, photo, githubLink, impact }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={styles.card}>
      <Box
        className={classNames(
          styles.cardFront,
          expanded ? styles.cardFrontHide : styles.cardFrontShow,
        )}>
        <Card className={styles.cardFrontContent}>
          <CardMedia component="img" alt={name} image={photo} className={styles.cardFrontPhoto} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6" className={styles.cardFrontName}>
              {name}
            </Typography>
            <Typography variant="body1" className={styles.cardFrontRole}>
              {role}
            </Typography>
            <Typography variant="body2" className={styles.cardFrontBio}>
              {bio}
            </Typography>
          </CardContent>

          <CardContent className={styles.cardFrontBottom}>
            <Link
              href={githubLink}
              underline="none"
              aria-label={name}
              target="_blank"
              className={styles.cardFrontBottomLink}>
              <GitHubIcon />
            </Link>
            <IconButton onClick={handleExpandClick} className={styles.cardFrontBottomButton}>
              Impact on project <ArrowForwardIcon />
            </IconButton>
          </CardContent>
        </Card>
      </Box>
      <Box
        className={classNames(
          styles.cardBack,
          !expanded ? styles.cardBackShow : styles.cardBackHide,
        )}>
        <Card className={styles.cardBackContent}>
          <CardContent className={styles.cardBackImpact}>
            <CardActions onClick={handleExpandClick} className={styles.cardBackBottom}>
              <IconButton className={styles.cardBackBottomIcon}>
                <CloseIcon />
              </IconButton>
            </CardActions>
            <Typography paragraph>{impact}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Card>
  );
};
