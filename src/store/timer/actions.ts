import { Dispatch, MiddlewareAPI } from 'redux';
import { Store } from '../Store';
import { TimerAction, TimerStateType } from './reducer';
import { TIMER } from './types';

export function done(store: MiddlewareAPI<Dispatch, Store>, action: TimerAction) {
  const state = store.getState();

  const { timer, settings } = state;
  let newTimerState: TimerStateType;

  switch (timer.state) {
    case 'work':
      newTimerState = settings.breakAutoStart ? 'break' : 'idle';
      break;
    case 'break':
      newTimerState = settings.pomodoroAutoStart ? 'work' : 'idle';
      break;
    default:
      newTimerState = timer.state;
  }

  store.dispatch({
    type: TIMER.SET,
    payload: {
      ...state,
      timer: {
        ...timer,
        stepIndex: timer.stepIndex + 1,
        state: newTimerState
      }
    }
  });
}
