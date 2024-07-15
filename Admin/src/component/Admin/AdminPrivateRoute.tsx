import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminPrivateRoute = () => {
 const { currentAdmin } = useSelector((state: any)=> state.admin)
  // console.log(currentAdmin)
  console.log("💕💕💕💕💕💕💕 private route admin ")
    return currentAdmin ? <Outlet /> : <Navigate to={"/login"} />;
}

export default AdminPrivateRoute
