import { Action } from "redux";
import { PLAN_SET, PLAN_ADD, PLAN_CLONE, PLAN_REMOVE, PLAN_ITEM_DEC, PLAN_ITEM_INC } from "./types";
import uuid from 'uuid';
import { DateTime } from 'luxon';
import { PlanItem } from '../../components/PlanList/PlanListItem';

interface PlanAction extends Action {
  payload: any; //Array<PlanItem> | Partial<PlanItem> | number;
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

const isEqualItem = (a: Partial<PlanItem>, b: Partial<PlanItem>) => {
  return a.category === b.category && a.description === b.description;
};

export default (state: Array<PlanItem> = initialState, action: PlanAction) => {
  switch (action.type) {
    case PLAN_SET:
      return action.payload;
    case PLAN_ADD:
      const lastItem = state.reduce((acc, item) => item.order > acc.order ? item : acc);
      if (isEqualItem(action.payload, lastItem)) {
        const index = state.indexOf(lastItem);
        state.splice(index, 1);
        return [...state, { ...lastItem, amount: lastItem.amount + 1 }];
      }
      return [
        ...state,
        {
          id: uuid(),
          category: action.payload.category,
          description: action.payload.description,
          order: state.length + 1,
          amount: 1,
          created_at: DateTime.local()
        }
      ];
    case PLAN_REMOVE:
      const removedItem = state.find(item => item.id === action.payload)!;
      return state
        .filter(item => item.id !== action.payload)
        .map(item => item.order > removedItem.order ? { ...item, order: item.order - 1 } : item);
    case PLAN_CLONE:
      return state;
    case PLAN_ITEM_INC:
      return state.map(item => item.id === action.payload ? { ...item, amount: item.amount + 1 } : item);
    case PLAN_ITEM_DEC:
      return state.map(item => item.id === action.payload && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item);
    default:
      return state;
  }
};
