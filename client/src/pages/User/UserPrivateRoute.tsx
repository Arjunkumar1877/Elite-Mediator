import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserPrivateRoute = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  // console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to={"/"} />;
};

export default UserPrivateRoute;
