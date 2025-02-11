import React, { createContext, useEffect, ReactNode } from "react";
import { AuthActionProps } from "../../core/model/auth-props.model";
import { useState } from "react";
import { AuthStateModel } from "../../core/model/auth-state.model";
import Modal from "../../components/shared/modal/modal";

const AuthContext = createContext<AuthActionProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthStateModel>({
    isAuthenticated: !!localStorage.getItem("accessToken"),
    token: localStorage.getItem("accessToken"),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const login = (token: string) => {
    setMessage("Iniciando sesión...");
    setLoading(true);

    setTimeout(() => {
      setState({ ...state, isAuthenticated: true, token });
      localStorage.setItem("accessToken", token);
      setLoading(false);
    }, 3000);
  };

  const logout = () => {
    setMessage("Cerrando sesión...");
    setLoading(true);

    setTimeout(() => {
      setState({ ...state, isAuthenticated: false, token: null });
      localStorage.removeItem("accessToken");
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isAuthenticated: !!localStorage.getItem("accessToken"),
      token: localStorage.getItem("accessToken"),
    }));
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
      <Modal isOpen={loading} message={message} />
    </AuthContext.Provider>
  );
};

export default AuthContext;
