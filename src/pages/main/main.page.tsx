import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './main.page.module.scss';
import { Route } from '@/routes';

export const MainPage: FC = () => (
  <ul className={styles.page}>
    {Object.entries(Route).map(([name, path]) => (
      <li>
        <Link to={path}>{name}</Link>
      </li>
    ))}
  </ul>
);
