import { offerFromAPIMock } from '@store/initialState.mock';
import { OfferAdapter } from './Offer.adapter';

describe('OfferAdapter', () => {
  it('should adapt correctly', () => {
    const adapted = OfferAdapter(offerFromAPIMock[0]);
    expect(adapted).toEqual({
      id: 32,
      order: 1,
      fullPrice: 600,
      description: 'Parcelado',
      installments: 12,
      discountAmmount: 60,
      period: 'Anual',
      netValue: 540,
      discountPercentage: -10,
    });
  });
});
