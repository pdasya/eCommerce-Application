import React, { FC } from 'react';
import styles from './dummy.component.module.scss';

export const Dummy: FC = () => (
  <section>
    <div className={styles.Dummy}>
      <h1>Some header</h1>
      <p>Some text</p>
    </div>
  </section>
);
