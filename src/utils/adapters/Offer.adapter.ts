import { Offer, OfferAdapted } from '@interfaces/Offer.interface';

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const PERIOD_TRANSLATOR: { [key: string]: string } = {
  annually: 'Anual',
};

/**
 * @description Adapt the response of offers from API to
 * the interface expected to display the infos on the view.
 *
 * @export
 * @param {Offer} offer
 * @return {*}  {OfferAdapted}
 */
export function OfferAdapter({
  id,
  period,
  fullPrice,
  description,
  discountAmmount,
  discountPercentage,
  installments,
  order,
}: Offer): OfferAdapted {
  return {
    id,
    order,
    fullPrice,
    description,
    installments,
    discountAmmount,
    period: PERIOD_TRANSLATOR[period],
    netValue: fullPrice - discountAmmount,
    discountPercentage: -(discountPercentage * 100),
  };
}
