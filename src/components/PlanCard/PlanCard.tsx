import { Badge } from '@components/Badge/Badge';
import { OfferAdapted } from '@interfaces/Offer.interface';
import { selectPlan } from '@store/ducks/subscription';
import { formatToBRLCurrency } from '@utils/currency/currency';
import classNames from 'classnames';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import styles from './PlanCard.module.scss';

interface PlanCardProps extends OfferAdapted {}

export const PlanCard = ({
  id,
  description,
  discountPercentage,
  installments,
  period,
  fullPrice,
  discountAmmount,
  netValue,
  ...props
}: PlanCardProps): ReactElement => {
  const dispatch = useDispatch();

  return (
    <label htmlFor={id.toString()} className={styles.card}>
      <div className={classNames(styles.card__details)}>
        <div className={styles.details__info}>
          <h5>
            {period} | {description}
          </h5>
          <strong>
            De {formatToBRLCurrency(fullPrice)} | Por{' '}
            {formatToBRLCurrency(netValue)}
          </strong>
          <small>
            {installments}x de {formatToBRLCurrency(netValue / installments)}
            /mês
          </small>
        </div>
        <div className={styles.details__discount}>
          <Badge color='secondary' label={`${discountPercentage}%`} />
        </div>
      </div>

      <input
        {...props}
        value={id}
        name='plan'
        type='radio'
        id={`plan${id}`}
        className={styles.card__input}
        onChange={() =>
          dispatch(selectPlan({ offerId: id, installments, netValue }))
        }
      />
    </label>
  );
};
