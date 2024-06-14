import "./App.css";
import Landing from "./component/Admin/LandingPage";
import Login from "./component/Admin/Login";
// import Landing from './pages/LandingPage'
import ServicePage from "./component/Admin/ServicePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./component/Admin/Signup";
import OtpVerification from "./component/Admin/VerifyOtp";
import UserVerifyData from "./component/Admin/UserVerifyData";
import ProfilePage from "./component/Admin/ProfilePage";
import EditProfilePage from "./component/Admin/EditProfilePage";
import AdminPrivateRoute from "./component/Admin/AdminPrivateRoute";
import  { Toaster } from "react-hot-toast";
import DashboardPage from "./component/Admin/DashboardPage";
import PropertyDataPage from "./component/Admin/PropertyDataPage";
import GenerateQrCodePage from "./component/Admin/GenerateQrCodePage";
import AdminChatListPage from "./component/Admin/AdminChatListPage";
import AdminChatPage from "./component/Admin/AdminChatPage";
import InitialDataPage from "./component/User/UserInitialLogin";


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
          <Route path="/verify_otp_page/:ph" element={<OtpVerification />} />

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin-data" element={<UserVerifyData />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/editprofile" element={<EditProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/qrcodes" element={<PropertyDataPage />} />
            <Route path="/generate_qr" element={<GenerateQrCodePage />} />
            <Route path="/chat_list" element={<AdminChatListPage />} />
            <Route path="/admin_chat/:id" element={<AdminChatPage />} />
          </Route>

          <Route path='/new_user' element={<InitialDataPage/>} />
          {/* <Route path="/user_verify_otp_page/:id" element={} /> */}

        </Routes>
      </BrowserRouter>
     
    </div>
  );
}



