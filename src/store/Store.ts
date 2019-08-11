import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { PlanItem } from '../components/PlanList/PlanListItem';
import planMiddleware from './plan/middleware';
import plan, { PlanAction } from './plan/reducer';
import settings, { SettingsState, SettingsAction } from './settings/reducer';
import timer, { TimerAction } from './timer/reducer';

type Actions = PlanAction | TimerAction | SettingsAction;
const store = createStore<Store, Actions, unknown, unknown>(
  combineReducers({
    plan,
    timer,
    settings
  }),
  composeWithDevTools(applyMiddleware(planMiddleware))
);

export interface Store {
  plan: Array<PlanItem>;
  timer: any;
  settings: SettingsState;
}

export default store;
