import { DateTime } from "luxon";
import { Action } from "redux";
import { PlanItem } from "../../components/PlanList/PlanListItem";
import { TIMER } from "./types";

export type TimerStateType = 'work' | 'idle' | 'break';
export interface TimerState {
  currentItem: PlanItem | null
  stepIndex: number;
  state: TimerStateType;
  endTime?: DateTime;
  timerId?: NodeJS.Timeout;
  onTimer?: () => void;
}

const initialState: TimerState = {
  currentItem: null,
  stepIndex: 0,
  state: 'idle',
  endTime: undefined,
  timerId: undefined,
  onTimer: undefined
};

export interface TimerAction extends Action {
  payload: any;
}

export default (state = initialState, action: TimerAction): TimerState => {
  return action.type === TIMER.SET ? action.payload : state;
}