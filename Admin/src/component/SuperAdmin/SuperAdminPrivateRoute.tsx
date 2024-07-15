import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const SuperAdminPrivateRoute = () => {
    const { currentSuperAdmin } = useSelector((state: any)=> state.superAdmin);
  return currentSuperAdmin ? <Outlet /> : <Navigate to={"/super_admin_login"} />
}

export default SuperAdminPrivateRoute
