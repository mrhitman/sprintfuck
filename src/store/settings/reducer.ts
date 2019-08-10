import { Action } from "redux";
import { SETTINGS } from "./types";

export interface SettingsState {
}

const initialState: SettingsState = {
};

export interface SettingsAction extends Action {
  payload: any;
}

export default (state = initialState, action: SettingsAction): SettingsState => {
  return action.type === SETTINGS.SET ? action.payload : state;
}