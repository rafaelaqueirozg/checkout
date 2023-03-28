export interface Offer {
  id: number;
  storeId: string;
  title: string;
  description: string;
  caption: string;
  fullPrice: number;
  discountAmmount: number;
  discountPercentage: number;
  periodLabel: string;
  period: string;
  discountCouponCode: null;
  order: number;
  priority: number;
  gateway: string;
  splittable: boolean;
  installments: number;
  acceptsCoupon: boolean;
}

export interface OfferAdapted
  extends Pick<
    Offer,
    | 'period'
    | 'discountPercentage'
    | 'description'
    | 'installments'
    | 'fullPrice'
    | 'discountAmmount'
    | 'id'
  > {
  netValue: number;
  order?: number;
}
