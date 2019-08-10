import { createStore, combineReducers } from "redux";
import plan from "./plan/reducer";
// import planMiddleware from "./plan/middleware";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  combineReducers({
    plan
  }),
  composeWithDevTools()
);

export default store;
