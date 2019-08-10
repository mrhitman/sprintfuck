import { Action } from "redux";
import { PLAN } from "./types";
import uuid from 'uuid';
import { DateTime } from 'luxon';
import { PlanItem } from '../../components/PlanList/PlanListItem';

export interface PlanAction extends Action {
  payload: any; // Array<PlanItem> | string | Partial<PlanItem>;
}

const initialState = [
  {
    id: uuid(),
    category: "work",
    description: "do pomidoro",
    order: 1,
    is_favorite: false,
    amount: 1,
    created_at: DateTime.local()
  }
];


export default (state: Array<PlanItem> = initialState, action: PlanAction): Array<PlanItem> => {
    if (action.type === PLAN.SET) {
      return action.payload;
    }
    return state;
};
