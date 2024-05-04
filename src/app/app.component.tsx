import React, { FC } from 'react';
import styles from './app.component.module.css';

const App: FC = () => (
  <section>
    <div className={styles.App}>
      <h1 className={styles.App__title}>React TypeScript Webpack Starter Template</h1>
      <p className={styles.App__text}>Text</p>
    </div>
  </section>
);

export default App;
