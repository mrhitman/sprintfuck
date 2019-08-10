import { Action } from "redux";
import { PlanItem } from "../../components/PlanList/PlanListItem";
import { TIMER } from "./types";

export interface TimerState {
  currentItem: PlanItem | null
}

const initialState: TimerState = {
  currentItem: null
};

export interface TimerAction extends Action {
  payload: any;
}

export default (state = initialState, action: TimerAction): TimerState => {
  return action.type === TIMER.SET ? action.payload : state;
}