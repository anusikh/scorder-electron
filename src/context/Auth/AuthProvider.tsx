import React, { ReactNode } from "react";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = React.useState<boolean>(false);

  const toggleAuthenticated = () => {
    setAuthenticated((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ authenticated, toggleAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
