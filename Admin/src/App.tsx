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
import { Toaster } from "react-hot-toast";
import DashboardPage from "./component/Admin/DashboardPage";
import PropertyDataPage from "./component/Admin/PropertyDataPage";
import GenerateQrCodePage from "./component/Admin/GenerateQrCodePage";
import AdminChatListPage from "./component/Admin/AdminChatListPage";
import AdminChatPage from "./component/Admin/AdminChatPage";
import InitialDataPage from "./component/User/UserInitialLogin";
import UserLoginOtpVerify from "./component/User/UserLoginOtpVerify";
import UserPrivateRoute from "./component/User/UserPrivateRoute";
import SocketProvider from "./contexts/AdminContext";
import AdminCallPage from "./component/Admin/AdminCallPage";
import UserCallPage from "./component/User/UserCallPage";
import UserChatPage from "./component/User/UserChatPage";
import UsersListPage from "./component/Admin/UsersListPage";

export default function App() {
  return (
    <div className="">
      {/* <ServicePage /> */}
      <Toaster />
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify_otp_page/:ph" element={<OtpVerification />} />
           <Route path="/visitors" element={<UsersListPage />} />


            <Route element={<AdminPrivateRoute />}>
              <Route path="/admin-data" element={<UserVerifyData />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/editprofile" element={<EditProfilePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/qrcodes" element={<PropertyDataPage />} />
              <Route path="/generate_qr" element={<GenerateQrCodePage />} />
              <Route path="/chat_list" element={<AdminChatListPage />} />
              <Route path="/admin_chat" element={<AdminChatPage />} />
              <Route path="/admin_call_page" element={<AdminCallPage />} />
            </Route>



            <Route path="/new_user" element={<InitialDataPage />} />
            <Route
              path="/user_verify_otp_page/:id"
              element={<UserLoginOtpVerify />}
            />
            <Route element={<UserPrivateRoute />}>
              <Route path="/chat_user" element={<UserChatPage />} />
              <Route path="/call_page_user" element={<UserCallPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
}
