import { Store, Action } from "redux";

export default ({ getState, dispatch }: Store) => (
  next: (action: Action) => void
) => (action: Action) => {
  const state = getState();
  dispatch(state);
  next(action);
};
