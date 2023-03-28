/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Offer, OfferAdapted } from '@interfaces/Offer.interface';
import { AnyAction } from '@reduxjs/toolkit';
import { Action } from '@store/store';

export interface OfferState {
  fromAPI: Offer[];
  adapted: OfferAdapted[];
}

// Action Types
export const Types = {
  FETCH: 'offer/FETCH',
};

// Reducer
const initialState: OfferState = {
  fromAPI: [],
  adapted: [],
};

export function offerReducer(
  state = initialState,
  { type, payload }: AnyAction
): OfferState {
  switch (type) {
    case Types.FETCH:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// Action Creators
export function fetchOffers(payload: OfferState): Action {
  return {
    type: Types.FETCH,
    payload,
  };
}
