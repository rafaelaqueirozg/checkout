import { Offer } from '@components/Offer/Offer';
import { Payment } from '@components/Payment/Payment';
import { ReactElement } from 'react';
import styles from './Checkout.module.scss';

export const Checkout = (): ReactElement => {
  return (
    <section className={styles.content}>
      <Payment />
      <Offer />
    </section>
  );
};
