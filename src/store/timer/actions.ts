import { Dispatch, MiddlewareAPI } from 'redux';
import { Store } from '../Store';
import { TimerAction, TimerStateType } from './reducer';
import { TIMER } from './types';
import { DateTime } from 'luxon';

export function done(store: MiddlewareAPI<Dispatch, Store>, action: TimerAction) {
  const state = store.getState();

  const { timer, settings } = state;
  let newTimerState: TimerStateType;
  let length: number = 0;

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

  length = newTimerState === 'work' ? settings.pomodoro : length;
  if (newTimerState === 'break') {
    length = timer.stepIndex >= settings.longBreakInterval ? settings.longBreak : settings.shortBreak;
  }

  store.dispatch({
    type: TIMER.SET,
    payload: {
      ...timer,
      stepIndex: timer.stepIndex >= settings.longBreakInterval ? 0 : timer.stepIndex + 1,
      endTime: newTimerState === 'idle' ? undefined : DateTime.local().plus({ minutes: length }),
      state: newTimerState
    }
  });
}
