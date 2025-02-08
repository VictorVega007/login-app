import React, { createContext, useEffect, ReactNode } from "react";
import { AuthActionProps } from "../../core/model/auth-props.model";
import { useState } from "react";
import { AuthStateModel } from "../../core/model/auth-state.model";

const AuthContext = createContext<AuthActionProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthStateModel>({
    isAuthenticated: !!sessionStorage.getItem("authToken"),
    token: sessionStorage.getItem("authToken"),
  });

  const login = (token: string) => {
    console.log(token);
    setState({ ...state, isAuthenticated: true, token });
    sessionStorage.setItem("authToken", token);
  };

  const logout = () => {
    setState({ ...state, isAuthenticated: false, token: null });
    sessionStorage.removeItem("authToken");
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isAuthenticated: !!sessionStorage.getItem("authToken"),
      token: sessionStorage.getItem("authToken"),
    }));
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
