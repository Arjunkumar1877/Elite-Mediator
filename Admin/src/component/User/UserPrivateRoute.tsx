import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserPrivateRoute = () => {
 const { currentUser } = useSelector((state: any)=> state.admin)
  console.log(currentUser)
    return currentUser ? <Outlet /> : <Navigate to={"/new_user"} />;
}

export default UserPrivateRoute
