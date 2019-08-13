import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { Store } from '../Store';
import { TimerAction } from './reducer';
import { TIMER } from './types';
import { done } from './actions';

const middleware: Middleware = (store: MiddlewareAPI<Dispatch, Store>) => (next: Dispatch) => (
  action: TimerAction
) => {
  switch (action.type) {
    case TIMER.START:
      return next(action);
    case TIMER.STOP:
      return next(action);
    case TIMER.DONE:
      return done(store, action);
    default:
      next(action);
  }
};

export default middleware;
