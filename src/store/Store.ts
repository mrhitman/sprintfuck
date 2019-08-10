import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { PlanItem } from '../components/PlanList/PlanListItem';
import planMiddleware from './plan/middleware';
import plan from './plan/reducer';
import settings from './settings/reducer';
import timer from './timer/reducer';

const store = createStore(
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
  settings: any;
}

export default store;
