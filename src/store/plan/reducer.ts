import { DateTime } from 'luxon';
import { Action } from 'redux';
import uuid from 'uuid';
import { PlanItem } from '../../components/PlanList/PlanListItem';
import { PLAN } from './types';

export interface PlanAction extends Action {
  payload: any; // Array<PlanItem> | string | Partial<PlanItem>;
}

export const initialState = [
  {
    id: uuid(),
    category: 'work',
    description: 'do pomidoro',
    order: 1,
    is_favorite: false,
    amount: 1,
    created_at: DateTime.local()
  }
];

export default (state: Array<PlanItem> = initialState, action: PlanAction): Array<PlanItem> => {
  return action.type === PLAN.SET ? action.payload : state;
};
