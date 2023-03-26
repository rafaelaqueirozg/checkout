import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import styles from './PaymentForm.module.scss';

export const PaymentForm = (): ReactElement => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown): void => console.log(data);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form__field}>
        <label htmlFor='creditCardNumber' className={styles.label}>
          Número do cartão
        </label>
        <input
          type='text'
          id='creditCardNumber'
          className={styles.input}
          placeholder='0000 0000 0000 0000'
          {...register('creditCardNumber', {
            required: true,
            minLength: 15,
            maxLength: 15,
            pattern: /^(\d{4}\s{1}){3}\d{4}$/gm,
          })}
        />
      </div>

      <div className={styles.form__fields}>
        <div className={styles.form__field}>
          <label htmlFor='creditCardExpirationDate' className={styles.label}>
            Validade
          </label>
          <input
            type='text'
            placeholder='MM/AA'
            className={styles.input}
            id='creditCardExpirationDate'
            {...register('creditCardExpirationDate', {
              required: true,
              pattern: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
            })}
          />
        </div>
        <div className={styles.form__field}>
          <label htmlFor='creditCardCVV' className={styles.label}>
            CVV
          </label>
          <input
            type='text'
            placeholder='000'
            id='creditCardCVV'
            className={styles.input}
            {...register('creditCardCVV', {
              max: 999,
              minLength: 3,
              maxLength: 3,
              required: true,
              pattern: /\d{3}/,
            })}
          />
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
          className={styles.input}
          {...register('creditCardHolder', { required: true, minLength: 3 })}
        />
      </div>

      <div className={styles.form__field}>
        <label htmlFor='creditCardCPF' className={styles.label}>
          CPF
        </label>
        <input
          type='text'
          id='creditCardCPF'
          className={styles.input}
          placeholder='000.000.000-00'
          {...register('creditCardCPF', {
            required: true,
            minLength: 14,
            maxLength: 14,
            pattern: /^(\d{3}\.){2}\d{3}-\d{2}$/,
          })}
        />
      </div>

      <div className={styles.form__field}>
        <label htmlFor='couponCode' className={styles.label}>
          Cupom
        </label>
        <input
          type='text'
          id='couponCode'
          {...register('couponCode', { required: true, maxLength: 50 })}
          className={styles.input}
          placeholder='Insira aqui'
        />
      </div>

      <div className={styles.form__field}>
        <label htmlFor='installments' className={styles.label}>
          Número de parcelas
        </label>
        <select
          defaultValue=''
          id='installments'
          {...register('installments', { required: true })}
          className={`${styles.input} ${styles.select}`}
        >
          <option value=''>Selecionar</option>
        </select>
      </div>

      <button type='submit' className={styles.form__button}>
        Finalizar pagamento
      </button>
    </form>
  );
};
