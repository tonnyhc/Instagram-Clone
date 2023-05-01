import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthDataContext } from "../../contexts/AuthContext";

export const AuthGuard = ({ children }) => {
  const { isAuth, userData } = useContext(AuthDataContext);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  if (!userData.is_confirmed) {
    return <Navigate to='/register' />
  }

  return children ? children : <Outlet />;
};
