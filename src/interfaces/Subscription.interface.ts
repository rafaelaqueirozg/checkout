export interface Subscription {
  couponCode: null | string;
  creditCardCPF: string;
  creditCardCVV: string;
  creditCardExpirationDate: string;
  creditCardHolder: string;
  creditCardNumber: string;
  gateway: string;
  installments: number;
  offerId: number;
  userId: number;
}

export interface SubscriptionForm
  extends Omit<Subscription, 'userId' | 'gateway' | 'offerId'> {}
