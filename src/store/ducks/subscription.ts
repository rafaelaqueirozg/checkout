/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Subscription,
  SubscriptionForm,
} from '@interfaces/Subscription.interface';
import { AnyAction } from '@reduxjs/toolkit';
import { Action } from '@store/store';

export interface SubscriptionState extends Subscription {
  canPost: boolean;
  netValue?: number;
}

interface SelectPlanState
  extends Pick<SubscriptionState, 'installments' | 'offerId' | 'netValue'> {}

// Action Types
export const Types = {
  RESET: 'subscription/RESET',
  SELECT_PLAN: 'subscription/SELECT_PLAN',
  FINISH_PAYMENT: 'subscription/FINISH_PAYMENT',
};

// Reducer
const initialState: SubscriptionState = {
  offerId: 0,
  creditCardCPF: '',
  creditCardCVV: '',
  creditCardExpirationDate: '',
  creditCardHolder: '',
  creditCardNumber: '',
  installments: 0,
  userId: 1,
  gateway: 'iugu',
  couponCode: null,
  netValue: 0,
  canPost: false,
};

export function subscriptionReducer(
  state = initialState,
  { type, payload }: AnyAction
): SubscriptionState {
  switch (type) {
    case Types.SELECT_PLAN:
      return {
        ...state,
        offerId: payload.offerId,
        netValue: payload.netValue,
        installments: payload.installments,
      };
    case Types.FINISH_PAYMENT:
      return {
        ...state,
        couponCode: payload.couponCode,
        creditCardCPF: payload.creditCardCPF.replace(/\D/g, ''),
        creditCardCVV: payload.creditCardCVV,
        creditCardExpirationDate: payload.creditCardExpirationDate,
        creditCardHolder: payload.creditCardHolder,
        creditCardNumber: payload.creditCardNumber.replace(/\D/g, ''),
        installments: payload.installments,
        canPost: true,
      };
    case Types.RESET:
      return payload;
    default:
      return state;
  }
}

// Action Creators
export function selectPlan(payload: SelectPlanState): Action {
  return {
    type: Types.SELECT_PLAN,
    payload,
  };
}

export function finishPayment(payload: SubscriptionForm): Action {
  return {
    type: Types.FINISH_PAYMENT,
    payload,
  };
}

export function resetValues(): Action {
  return {
    type: Types.RESET,
    payload: initialState,
  };
}
