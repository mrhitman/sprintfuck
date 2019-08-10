import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import planMiddleware from './plan/middleware';
import plan from './plan/reducer';
import { PlanItem } from '../components/PlanList/PlanListItem';

const store = createStore(
  combineReducers({
    plan
  }),
  composeWithDevTools(applyMiddleware(planMiddleware))
);

export interface Store {
  plan: Array<PlanItem>;
}

export default store;
