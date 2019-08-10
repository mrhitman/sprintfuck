import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import planMiddleware from "./plan/middleware";
import plan from "./plan/reducer";


const store = createStore(
  combineReducers({
    plan
  }),
  composeWithDevTools(
    applyMiddleware(planMiddleware))
);

export default store;
