import { Offer } from '@interfaces/Offer.interface';
import { Subscription } from '@interfaces/Subscription.interface';
import createHttpService from '@services/HttpService';

export interface CheckoutService {
  getOffers: Promise<Offer[]>;
  postSubscription: Promise<Subscription>;
}

const httpService = createHttpService(
  'https://private-0ced4-pebmeddesafiofrontend.apiary-mock.com/'
);

export const getOffers = async (): Promise<Offer[]> => {
  return await httpService.get<Offer[]>('/offer');
};

export const postSubscription = async (body: Subscription): Promise<Subscription> => {
  return await httpService.post<Subscription>('/subscription', body);
};
