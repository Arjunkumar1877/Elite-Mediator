import "./App.css";
import Landing from "./component/LandingPage";
import Login from "./pages/Login";
// import Landing from './pages/LandingPage'
import ServicePage from "./component/ServicePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import OtpVerification from "./pages/VerifyOtp";
import UserVerifyData from "./pages/UserVerifyData";
import ProfilePage from "./component/ProfilePage";
import EditProfilePage from "./component/EditProfilePage";
import AdminPrivateRoute from "./component/AdminPrivateRoute";
import  { Toaster } from "react-hot-toast";
import DashboardPage from "./component/DashboardPage";


export default function App() {
  return (
    <div className="">
      {/* <ServicePage /> */}
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyOtpPage/:ph" element={<OtpVerification />} />

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin-data" element={<UserVerifyData />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/editprofile" element={<EditProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
     
    </div>
  );
}




