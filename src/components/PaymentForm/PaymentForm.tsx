/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SubscriptionForm } from '@interfaces/Subscription.interface';
import { finishPayment, SubscriptionState } from '@store/ducks/subscription';
import { RootState } from '@store/store';
import { formatToBRLCurrency } from '@utils/currency/currency';
import classNames from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PaymentForm.module.scss';

interface PlanIntallments {
  installment: number;
  value: number;
}

export const PaymentForm = (): ReactElement => {
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SubscriptionForm>({
    mode: 'all',
    defaultValues: {
      couponCode: '',
      creditCardCPF: '',
      creditCardCVV: '',
      creditCardExpirationDate: '',
      creditCardHolder: '',
      creditCardNumber: '',
      installments: 0,
    },
  });

  const [planInstallments, setPlanInstallments] = useState<PlanIntallments[]>(
    []
  );

  const { installments, netValue } = useSelector<RootState, SubscriptionState>(
    (state) => state.subscription
  );

  const onSubmit = (data: SubscriptionForm): void => {
    dispatch(finishPayment(data));
    reset();
  };

  const getInvalidFeedbackByField = (
    field: keyof SubscriptionForm
  ): JSX.Element | undefined => {
    return (
      errors?.[field] && (
        <small
          data-testid='invalid-feedback'
          className={styles['invalid-feedback']}
        >
          {errors?.[field]?.message}
        </small>
      )
    );
  };

  const calculateInstallments = (
    installments: number,
    netValue: number
  ): PlanIntallments[] => {
    return Array.from({ length: installments }, (value, index) => {
      const installment = index + 1;
      return {
        installment,
        value: netValue / installment,
      };
    });
  };

  useEffect(() => {
    setPlanInstallments(calculateInstallments(installments, netValue!));
  }, [installments]);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit) as React.FormEventHandler}
    >
      <div className={styles.form__field}>
        <label htmlFor='creditCardNumber' className={styles.label}>
          Número do cartão
        </label>
        <input
          type='text'
          id='creditCardNumber'
          className={classNames(styles.input, {
            [styles['input--invalid']]: errors?.creditCardNumber,
          })}
          maxLength={19}
          placeholder='0000 0000 0000 0000'
          {...register('creditCardNumber', {
            required: {
              value: true,
              message: 'Insira o número do cartão.',
            },
            pattern: {
              value: /^(\d{4}\s{1}){3}\d{4}$/,
              message: 'Formato inválido. Ex.: 0000 0000 0000 0000',
            },
            onChange: (event: React.FormEvent<HTMLInputElement>) => {
              const value = event.currentTarget?.value
                .replace(/\D/, '')
                .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');

              setValue('creditCardNumber', value, {
                shouldValidate: true,
              });
            },
          })}
        />
        {getInvalidFeedbackByField('creditCardNumber')}
      </div>
      <div className={styles.form__fields}>
        <div className={styles.form__field}>
          <label htmlFor='creditCardExpirationDate' className={styles.label}>
            Validade
          </label>
          <input
            type='text'
            maxLength={4}
            placeholder='MM/AA'
            className={classNames(styles.input, {
              [styles['input--invalid']]: errors?.creditCardExpirationDate,
            })}
            id='creditCardExpirationDate'
            {...register('creditCardExpirationDate', {
              required: {
                value: true,
                message: 'Insira a validade do cartão.',
              },
              pattern: {
                value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                message: 'Formato inválido. Ex.: MM/AA',
              },
              onChange: (event: React.FormEvent<HTMLInputElement>) => {
                const value = event.currentTarget?.value
                  .replace(/\D/, '')
                  .replace(/([0-9]{2})([0-9]{2})/, '$1/$2');

                setValue('creditCardExpirationDate', value, {
                  shouldValidate: true,
                });
              },
            })}
          />
          {getInvalidFeedbackByField('creditCardExpirationDate')}
        </div>

        <div className={styles.form__field}>
          <label htmlFor='creditCardCVV' className={styles.label}>
            CVV
          </label>
          <input
            type='text'
            maxLength={3}
            placeholder='000'
            id='creditCardCVV'
            className={classNames(styles.input, {
              [styles['input--invalid']]: errors?.creditCardCVV,
            })}
            {...register('creditCardCVV', {
              max: 999,
              minLength: 3,
              maxLength: 3,
              required: {
                value: true,
                message: 'Insira o CVV do cartão.',
              },
              pattern: {
                value: /\d{3}/,
                message: 'Formato inválido. Ex.: 000',
              },
              onChange: (event: React.FormEvent<HTMLInputElement>) => {
                const value = event.currentTarget?.value.replace(/\D/, '');

                setValue('creditCardCVV', value, {
                  shouldValidate: true,
                });
              },
            })}
          />
          {getInvalidFeedbackByField('creditCardCVV')}
        </div>
      </div>
      <div className={styles.form__field}>
        <label htmlFor='creditCardHolder' className={styles.label}>
          Nome impresso no cartão
        </label>
        <input
          type='text'
          id='creditCardHolder'
          placeholder='Seu nome'
          className={classNames(styles.input, {
            [styles['input--invalid']]: errors?.creditCardHolder,
          })}
          {...register('creditCardHolder', {
            required: {
              value: true,
              message: 'Insira o nome impresso no cartão.',
            },
            minLength: {
              value: 3,
              message: 'Insira mais pelo menos 3 carateres.',
            },
            onChange: (event: React.FormEvent<HTMLInputElement>) => {
              const value = event.currentTarget?.value.replace(
                /[^a-zA-Z\s]/,
                ''
              );

              setValue('creditCardHolder', value, {
                shouldValidate: true,
              });
            },
          })}
        />
        {getInvalidFeedbackByField('creditCardHolder')}
      </div>
      <div className={styles.form__field}>
        <label htmlFor='creditCardCPF' className={styles.label}>
          CPF
        </label>
        <input
          type='text'
          maxLength={14}
          id='creditCardCPF'
          className={classNames(styles.input, {
            [styles['input--invalid']]: errors?.creditCardCPF,
          })}
          placeholder='000.000.000-00'
          {...register('creditCardCPF', {
            required: { value: true, message: 'Insira o CPF.' },
            pattern: {
              value: /^(\d{3}\.){2}\d{3}-\d{2}$/,
              message: 'Formato inválido. Ex.: 000.000.000-00',
            },
            onChange: (event: React.FormEvent<HTMLInputElement>) => {
              const value = event.currentTarget?.value
                .replace(/\D/, '')
                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

              setValue('creditCardCPF', value, {
                shouldValidate: true,
              });
            },
          })}
        />
        {getInvalidFeedbackByField('creditCardCPF')}
      </div>
      <div className={styles.form__field}>
        <label htmlFor='couponCode' className={styles.label}>
          Cupom
        </label>
        <input
          type='text'
          maxLength={50}
          id='couponCode'
          {...register('couponCode', {
            maxLength: {
              value: 50,
              message: 'Insira um cupom com menos de 50 caracteres.',
            },
            onChange: (event: React.FormEvent<HTMLInputElement>) => {
              setValue('couponCode', event.currentTarget.value, {
                shouldValidate: true,
              });
            },
          })}
          className={classNames(styles.input, {
            [styles['input--invalid']]: errors?.couponCode,
          })}
          placeholder='Insira aqui'
        />
        {getInvalidFeedbackByField('couponCode')}
      </div>
      <div className={styles.form__field}>
        <label htmlFor='installments' className={styles.label}>
          Número de parcelas
        </label>
        <select
          id='installments'
          disabled={!installments}
          {...register('installments', {
            required: {
              value: true,
              message: 'Insira o número de parcelas.',
            },
            min: { value: 1, message: 'Insira o número de parcelas.' },
            onChange: (event: React.FormEvent<HTMLInputElement>) => {
              setValue('installments', Number(event.currentTarget.value), {
                shouldValidate: true,
              });
            },
          })}
          className={classNames(styles.input, styles.select, {
            [styles['input--invalid']]: errors?.installments,
            [styles['select--empty']]: !getValues().installments,
          })}
        >
          <option value='0' disabled>
            Selecionar
          </option>

          {planInstallments.map((item) => (
            <option key={item.value} value={item.value}>
              {`${item.installment}x ${formatToBRLCurrency(item.value)}`}
            </option>
          ))}
        </select>
        {getInvalidFeedbackByField('installments')}
      </div>
      <button
        type='submit'
        className={styles.form__button}
        disabled={!isValid || !installments}
      >
        Finalizar pagamento
      </button>
    </form>
  );
};
