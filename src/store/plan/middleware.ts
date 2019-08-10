import { DateTime } from 'luxon';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import uuid from 'uuid';
import { PlanItem } from '../../components/PlanList/PlanListItem';
import { PlanAction } from './reducer';
import { PLAN } from './types';

const isEqualItem = (a: Partial<PlanItem>, b: Partial<PlanItem>) => {
  return a.category === b.category && a.description === b.description;
};

const middleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: PlanAction) => {
  global.console.log(action);
  global.console.time(action.type);

  const state = store.getState().plan as Array<PlanItem>;
  switch (action.type) {
    case PLAN.ADD:
      const lastItem = state.reduce((acc, item) => (item.order > acc.order ? item : acc));
      if (isEqualItem(action.payload, lastItem)) {
        const index = state.indexOf(lastItem);
        state.splice(index, 1);
        return store.dispatch({
          type: PLAN.SET,
          payload: [
            ...state,
            {
              ...lastItem,
              amount: lastItem.amount + 1
            }
          ]
        });
      }
      return store.dispatch({
        type: PLAN.SET,
        payload: [
          ...state,
          {
            id: uuid(),
            category: action.payload.category,
            description: action.payload.description,
            order: state.length + 1,
            amount: 1,
            created_at: DateTime.local()
          }
        ]
      });
    case PLAN.REMOVE:
      const removedItem = state.find((item) => item.id === action.payload)!;
      return store.dispatch({
        type: PLAN.SET,
        payload: state.filter((item) => item.id !== action.payload).map(
          (item) =>
            item.order > removedItem.order
              ? {
                  ...item,
                  order: item.order - 1
                }
              : item
        )
      });
    case PLAN.CLONE:
      return next(action);
    case PLAN.ITEM_INC:
      return store.dispatch({
        type: PLAN.SET,
        payload: state.map(
          (item) =>
            item.id === action.payload
              ? {
                  ...item,
                  amount: item.amount + 1
                }
              : item
        )
      });
    case PLAN.ITEM_DEC:
      return store.dispatch({
        type: PLAN.SET,
        payload: state.map(
          (item) =>
            item.id === action.payload && item.amount > 1
              ? {
                  ...item,
                  amount: item.amount - 1
                }
              : item
        )
      });
    default:
      next(action);
  }
  global.console.timeEnd(action.type);
};

export default middleware;
