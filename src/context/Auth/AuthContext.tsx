import React from "react";

export const AuthContext = React.createContext({
  authenticated: false,
  toggleAuthenticated: () => {},
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};
