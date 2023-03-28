import questionIcon from '@assets/svg/question.svg';
import { Badge } from '@components/Badge/Badge';
import { PlanCard } from '@components/PlanCard/PlanCard';
import { Subscription } from '@interfaces/Subscription.interface';
import {
  getOffers,
  postSubscription,
} from '@services/Checkout/CheckoutService';
import { fetchOffers, OfferState } from '@store/ducks/offer';
import { RootState } from '@store/store';
import { OfferAdapter } from '@utils/adapters/Offer.adapter';
import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Offer.module.scss';

export const Offer = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adapted: offers } = useSelector<RootState, OfferState>(
    (state) => state.offer
  );

  const { canPost, ...subscription } = useSelector<
    RootState,
    Subscription & { canPost: boolean }
  >((state) => state.subscription);

  const getOffer = async (): Promise<void> => {
    const data = await getOffers();
    dispatch(fetchOffers({ fromAPI: data, adapted: data.map(OfferAdapter) }));
  };

  const finishPayment = async (): Promise<void> => {
    await postSubscription(subscription);
  };

  useEffect(() => {
    getOffer().catch(console.error);
  }, []);

  useEffect(() => {
    if (!canPost) return;

    finishPayment()
      .then(() => navigate('/signature_done'))
      .catch(console.error);
  }, [canPost]);

  return (
    <div className={styles.offer}>
      <h4>Confira o seu plano:</h4>
      <Badge label='fulano@cicrano.com.br' color='default' />

      <div className={styles.offer__plans}>
        {offers.map((offer) => (
          <div
            key={offer.id}
            style={{
              flex: 1,
              order: offer.order,
            }}
          >
            <PlanCard
              id={offer.id}
              period={offer.period}
              netValue={offer.netValue}
              fullPrice={offer.fullPrice}
              description={offer.description}
              installments={offer.installments}
              discountAmmount={offer.discountAmmount}
              discountPercentage={offer.discountPercentage}
            />
          </div>
        ))}
      </div>

      <span className={styles.offer__about}>
        Sobre a cobrança <img src={questionIcon} />
      </span>
    </div>
  );
};
