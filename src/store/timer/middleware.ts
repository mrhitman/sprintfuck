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
      const timerId = setInterval(action.payload.onTimer, 1000);
      return store.dispatch({
        type: TIMER.SET,
        payload: {
          ...state.timer,
          timerId,
          endTime: end,
          onTimer: action.payload.onTimer,
          state: 'work',
        }
      });
    case TIMER.STOP:
      clearInterval(state.timer.timerId!);
      return store.dispatch({
        type: TIMER.SET,
        payload: {
          ...state.timer,
          timerId: undefined,
          endTime: undefined,
          onTimer: undefined,
          state: 'pending',
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
