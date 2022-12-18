import { Actions } from "./Actions";
import { initialStateType, reducer } from "./AuthContext";

export const MainReducer = (
  { authenticated }: initialStateType,
  action: Actions
) => ({
  authenticated: reducer(authenticated, action),
});
