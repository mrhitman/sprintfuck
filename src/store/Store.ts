import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { PlanItem } from '../components/PlanList/PlanListItem';
import planMiddleware from './plan/middleware';
import plan, { PlanAction } from './plan/reducer';
import settings, { SettingsAction, SettingsState } from './settings/reducer';
import timerMiddleware from './timer/middleware';
import timer, { TimerAction, TimerState } from './timer/reducer';

type Actions = PlanAction | TimerAction | SettingsAction;
const store = createStore<Store, Actions, unknown, unknown>(
  combineReducers({
    plan,
    timer,
    settings
  }),
  composeWithDevTools(
    applyMiddleware(planMiddleware, timerMiddleware)
  )
);

export interface Store {
  plan: Array<PlanItem>;
  timer: TimerState;
  settings: SettingsState;
}

export default store;
