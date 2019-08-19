import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { Store } from '../Store';
import { TimerAction } from './reducer';
import { TIMER } from './types';
import { done } from './actions';
import { DateTime } from 'luxon';

const middleware: Middleware = (store: MiddlewareAPI<Dispatch, Store>) => (next: Dispatch) => (
  action: TimerAction
) => {
  const state = store.getState();
  console.log(action.type);
  switch (action.type) {
    case TIMER.START:
      const end = DateTime.local().plus({ minutes: state.settings.pomodoro });
      return store.dispatch({
        type: TIMER.SET,
        payload: {
          ...state.timer,
          endTime: end,
          state: 'work',
        }
      });
    case TIMER.STOP:
      return store.dispatch({
        type: TIMER.SET,
        payload: {
          ...state.timer,
          endTime: undefined,
          state: 'idle',
          stepIndex: 0
        }
      });
    case TIMER.DONE:
      return done(store, action);
    default:
      next(action);
  }
};

export default middleware;
