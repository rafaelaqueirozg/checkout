import americanexpressLogo from '@assets/svg/americanexpress.svg';
import dinnersclubLogo from '@assets/svg/dinnersclub.svg';
import eloLogo from '@assets/svg/elo.svg';
import iuguLogo from '@assets/svg/iugu.svg';
import mastercardLogo from '@assets/svg/mastercard.svg';
import visaLogo from '@assets/svg/visa.svg';
import { PaymentForm } from '@components/PaymentForm/PaymentForm';
import { ReactElement } from 'react';
import styles from './Payment.module.scss';

interface CreditCard {
  logo: string;
  alt: string;
}

const acceptedCreditCards: CreditCard[] = [
  { logo: mastercardLogo, alt: 'Cartão da bandeira Mastercard' },
  { logo: dinnersclubLogo, alt: 'Cartão da bandeira Dinners Club' },
  { logo: americanexpressLogo, alt: 'Cartão da bandeira American Express' },
  { logo: visaLogo, alt: 'Cartão da bandeira Visa' },
  { logo: eloLogo, alt: 'Cartão da bandeira Elo' },
];

export const Payment = (): ReactElement => {
  return (
    <div className={styles.payment}>
      <h4>Estamos quase lá!</h4>
      <p>Insira seus dados de pagamento abaixo:</p>

      <div className={styles.payment__info}>
        <div className={styles.cards}>
          {acceptedCreditCards.map((card, index) => (
            <img
              key={index}
              alt={card.alt}
              src={card.logo}
              data-testid='card-brand'
              className={styles.cards__card}
            />
          ))}
        </div>

        <small className={styles['powered-by']}>
          Pagamentos por
          <img
            src={iuguLogo}
            data-testid='iugu-logo'
            alt='Logo da instituição de pagamento Iugu'
            className={styles['powered-by__logo']}
          />
        </small>
      </div>

      <PaymentForm />
    </div>
  );
};
