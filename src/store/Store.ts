import { createStore, combineReducers } from "redux";
import plan from "./plan/reducer";

const store = createStore(
  combineReducers({
    plan
  })
);

export default store;
