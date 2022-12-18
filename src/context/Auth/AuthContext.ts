import React from "react";
import { Actions } from "./Actions";

export type initialStateType = {
  authenticated: boolean;
};

export const initialState = {
  authenticated: false,
};

export const AuthContext = React.createContext<{
  state: initialStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const reducer = (state: boolean, action: Actions) => {
  switch (action.type) {
    case "TOGGLE":
      return !state;
    default:
      return state;
  }
};
