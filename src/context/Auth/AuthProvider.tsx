import React, { ReactNode } from "react";
import { AuthContext, initialState } from "./AuthContext";
import { MainReducer } from "./MainReducer";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = React.useReducer(MainReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
