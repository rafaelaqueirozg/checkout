/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import checkIcon from '@assets/svg/check.svg';
import startIcon from '@assets/svg/star.svg';
import { OfferAdapted } from '@interfaces/Offer.interface';
import { OfferState } from '@store/ducks/offer';
import { resetValues, SubscriptionState } from '@store/ducks/subscription';
import { RootState } from '@store/store';
import { formatToBRLCurrency } from '@utils/currency/currency';
import classNames from 'classnames';
import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './SignatureDone.module.scss';

export const SignatureDone = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adapted } = useSelector<RootState, OfferState>(
    (state) => state.offer
  );

  const { offerId, creditCardCPF } = useSelector<RootState, SubscriptionState>(
    (state) => state.subscription
  );

  const {
    id: selectedOfferId,
    period,
    netValue,
    description,
    installments,
  }: OfferAdapted = adapted.find((offer) => offer.id === offerId) ||
  ({} as unknown as OfferAdapted);

  const getInstallmentValue = (
    netValue: number,
    installment: number
  ): number => {
    if (!netValue || !installment) return 0;
    return netValue / installment;
  };

  const onClickGoHome = (): void => {
    dispatch(resetValues());
    navigate('/checkout');
  };

  useEffect(() => {
    if (!selectedOfferId) {
      navigate('/checkout');
    }
  }, []);

  return (
    <div className={styles.content}>
      <img
        src={checkIcon}
        alt='Ícone de check'
        className={classNames(
          styles.content__icon,
          styles['content__icon--normal'],
          styles['content__icon--bordered']
        )}
      />
      <h1 className={styles.content__title}>Parabéns!</h1>
      <h2 className={styles.content__subtitle}>
        Sua assinatura foi realizada com sucesso.
      </h2>

      <div className={classNames(styles.content__signature, styles.info)}>
        <div className={styles.info__signature}>
          <img
            src={startIcon}
            alt='Ícone de estrela'
            className={classNames(
              styles.content__icon,
              styles['content__icon--small'],
              styles['content__icon--filled']
            )}
          />
          <div>
            <p>
              {period} | {description}
            </p>
            <p>
              {formatToBRLCurrency(netValue || 0)} | {installments}x{' '}
              {formatToBRLCurrency(getInstallmentValue(netValue, installments))}
            </p>
          </div>
        </div>

        <div className={styles.info__subscriber}>
          <div>
            <span>E-mail</span>
            <span>fulano@cicrano.com.br</span>
          </div>
          <div>
            <span>CPF</span>
            <span>
              {creditCardCPF.replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                '$1.$2.$3-$4'
              )}
            </span>
          </div>
        </div>
      </div>

      <footer className={classNames(styles.content__footer)}>
        <button
          className={classNames(styles.button, styles['button--secondary'])}
        >
          Gerenciar assinatura
        </button>
        <button
          onClick={onClickGoHome}
          className={classNames(styles.button, styles['button--primary'])}
        >
          IR PARA A HOME
        </button>
      </footer>
    </div>
  );
};
