import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const restrictedRoutes = ['/login', '/register'];

export const AuthGuard = ({ children, }) => {
  const authState = useSelector((state) => state.auth);
  const { isAuth, authUserData } = {...authState}; 

  if (!isAuth) {
    return <Navigate to="/login" />;
  };
  if (!authUserData.is_confirmed) {
    return <Navigate to='/register' />
  };


  return children ? children : <Outlet />;
};
