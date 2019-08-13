import { Dispatch, MiddlewareAPI } from 'redux';
import { Store } from '../Store';
import { TimerAction, TimerStateType } from './reducer';
import { TIMER } from './types';

const getNewTimerState = (state: Store): TimerStateType => {
  const { timer, settings } = state;
  switch (timer.state) {
    case 'work':
      return settings.breakAutoStart ? 'break' : 'idle';
    case 'break':
      return settings.pomodoroAutoStart ? 'work' : 'idle';
    default:
      return timer.state;
  }
};

export function done(store: MiddlewareAPI<Dispatch, Store>, action: TimerAction) {
  const state = store.getState();

  store.dispatch({
    type: TIMER.SET,
    payload: {
      ...state,
      timer: { ...state.timer, stepIndex: state.timer.stepIndex, state: getNewTimerState(state) }
    }
  });
}
