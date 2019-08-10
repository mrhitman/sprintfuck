import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { Store } from '../Store';
import { add, dec, inc, remove } from './actions';
import { PlanAction } from './reducer';
import { PLAN } from './types';

const middleware: Middleware = (store: MiddlewareAPI<Dispatch, Store>) => (next: Dispatch) => (action: PlanAction) => {
  switch (action.type) {
    case PLAN.ADD:
      return add(store, action);
    case PLAN.REMOVE:
      return remove(store, action);
    case PLAN.CLONE:
      return next(action);
    case PLAN.ITEM_INC:
      return inc(store, action);
    case PLAN.ITEM_DEC:
      return dec(store, action);
    default:
      next(action);
  }
};

export default middleware;
