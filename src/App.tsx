import { Header } from '@components/Header/Header';
import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';

const App = (): ReactElement => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
    </>
  );
};

export default App;
