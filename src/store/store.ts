import { configureStore } from '@reduxjs/toolkit';
import { offerReducer } from './ducks/offer';
import { subscriptionReducer } from './ducks/subscription';

export interface Action {
  type: string;
  payload: object;
}

export const store = configureStore({
  reducer: {
    offer: offerReducer,
    subscription: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
