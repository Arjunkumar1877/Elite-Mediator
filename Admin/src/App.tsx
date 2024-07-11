import React from "react";
import "./App.css";
import Landing from "./pages/Admin/LandingPage";
import Login from "./pages/Admin/Login";
import ServicePage from "./pages/Admin/ServicePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Admin/Signup";
import OtpVerification from "./pages/Admin/VerifyOtp";
import UserVerifyData from "./pages/Admin/UserVerifyData";
import ProfilePage from "./pages/Admin/ProfilePage";
import EditProfilePage from "./pages/Admin/EditProfilePage";
import AdminPrivateRoute from "./component/Admin/AdminPrivateRoute";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/Admin/DashboardPage";
import GenerateQrCodePage from "./pages/Admin/GenerateQrCodePage";
import AdminChatListPage from "./pages/Admin/AdminChatListPage";
import AdminChatPage from "./pages/Admin/AdminChatPage";
import InitialDataPage from "./pages/User/UserInitialLogin";
import UserLoginOtpVerify from "./pages/User/UserLoginOtpVerify";
import UserPrivateRoute from "./pages/User/UserPrivateRoute";
import SocketProvider from "./contexts/AdminContext";
import AdminCallPage from "./pages/Admin/AdminCallPage";
import UserCallPage from "./pages/User/UserCallPage";
import UserChatPage from "./pages/User/UserChatPage";
import UsersListPage from "./pages/Admin/UsersListPage";
import PropertyDataPage from "./pages/Admin/PropertyDataPage";

const App: React.FC = () => {
  return (
    <div className="">
      <Toaster />
      <SocketProvider>
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
              <Route path="/visitors" element={<UsersListPage />} />
              <Route path="/generate_qr" element={<GenerateQrCodePage />} />
              <Route path="/chat_list" element={<AdminChatListPage />} />
              <Route path="/admin_chat" element={<AdminChatPage />} />
              <Route path="/call_admin_page" element={<AdminCallPage />} />
            </Route>

            <Route path="/new_user" element={<InitialDataPage />} />
            <Route path="/user_verify_otp_page/:id" element={<UserLoginOtpVerify />} />
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

export default App;
