import { Action } from 'redux';
import { SETTINGS } from './types';

export interface SettingsState {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  pomodoroAutoStart: boolean;
  breakAutoStart: boolean;
  volume: number;
  language: 'ru';
  timeFormat: '12:00' | '24:00';
  categories: Array<string>;
  beep: string;
}

const initialState: SettingsState = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  pomodoroAutoStart: false,
  breakAutoStart: true,
  volume: 0.4,
  language: 'ru',
  timeFormat: '24:00',
  categories: [ 'work', 'other' ],
  beep: 'https://www.soundjay.com/button/beep-01a.mp3'
};

export interface SettingsAction extends Action {
  payload: any;
}

export default (state = initialState, action: SettingsAction): SettingsState => {
  return action.type === SETTINGS.SET ? action.payload : state;
};
