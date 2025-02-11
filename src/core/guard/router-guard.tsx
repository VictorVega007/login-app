import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/auth-hook/use-auth.hook";

const RouterGuard = () => {
  const { state } = useAuth();

  return state.isAuthenticated ? <Outlet /> : <Navigate to="/inicio" />;
};

export default RouterGuard;
