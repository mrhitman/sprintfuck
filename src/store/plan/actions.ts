import { DateTime } from 'luxon';
import { Dispatch, MiddlewareAPI } from 'redux';
import uuid from 'uuid';
import { PlanItem } from '../../components/PlanList/PlanListItem';
import { Store } from '../Store';
import { PlanAction } from './reducer';
import { PLAN } from './types';

const isEqualItem = (a: Partial<PlanItem>, b: Partial<PlanItem>) => {
  return a.category === b.category && a.description === b.description;
};

export function add(store: MiddlewareAPI<Dispatch, Store>, action: PlanAction) {
  const { plan } = store.getState();
  const lastItem = plan.reduce((acc, item) => (item.order > acc.order ? item : acc));

  if (isEqualItem(action.payload, lastItem)) {
    return store.dispatch({ type: PLAN.ITEM_INC, payload: lastItem.id });
  }

  return store.dispatch({
    type: PLAN.SET,
    payload: [
      ...plan,
      {
        id: uuid(),
        category: action.payload.category,
        description: action.payload.description,
        order: plan.length + 1,
        amount: 1,
        created_at: DateTime.local()
      }
    ]
  });
}

export function remove(store: MiddlewareAPI<Dispatch, Store>, action: PlanAction) {
  const { plan } = store.getState();
  const removedItem = plan.find((item) => item.id === action.payload)!;
  return store.dispatch({
    type: PLAN.SET,
    payload: plan
      .filter((item) => item.id !== action.payload)
      .map((item) => (item.order > removedItem.order ? { ...item, order: item.order - 1 } : item))
  });
}

export function inc(store: MiddlewareAPI<Dispatch, Store>, action: PlanAction) {
  const { plan } = store.getState();
  return store.dispatch({
    type: PLAN.SET,
    payload: plan.map((item) => (item.id === action.payload ? { ...item, amount: item.amount + 1 } : item))
  });
}

export function dec(store: MiddlewareAPI<Dispatch, Store>, action: PlanAction) {
  const { plan } = store.getState();
  return store.dispatch({
    type: PLAN.SET,
    payload: plan.map(
      (item) => (item.id === action.payload && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item)
    )
  });
}
