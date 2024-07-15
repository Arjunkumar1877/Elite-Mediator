import React, { useEffect } from "react";
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
import { onMessageListener, requestPermission } from "./firebase/firebase";
import SuperAdminLogin from "./pages/SuperAdmin/SuperAdminLogin";
import SuperAdminDashboardPage from "./pages/SuperAdmin/SuperAdminDashboardPage";
import SuperAdminRegisteredAdminsListPage from "./pages/SuperAdmin/SuperAdminRegisteredAdminsListPage";
import SuperAdminRegisteredAdminProfilePage from "./pages/SuperAdmin/SuperAdminRegisteredAdminProfilePage";
import SuperAdmiPosterPage from "./pages/SuperAdmin/SuperAdmiPosterPage";
import SuperAdminPrivateRoute from "./component/SuperAdmin/SuperAdminPrivateRoute";

const App: React.FC = () => {
  useEffect(() => {
    requestPermission();

    const unsubscribe = onMessageListener();

    return () => {
      unsubscribe.then(() => {}).catch((err) => console.log("failed " + err));
    };
  }, []);

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
            <Route
              path="/user_verify_otp_page/:id"
              element={<UserLoginOtpVerify />}
            />
            <Route element={<UserPrivateRoute />}>
              <Route path="/chat_user" element={<UserChatPage />} />
              <Route path="/call_page_user" element={<UserCallPage />} />
            </Route>











            <Route path="/super_admin_login" element={<SuperAdminLogin />} />

            <Route element={<SuperAdminPrivateRoute />}>
              <Route
                path="/super_admin_dashboard"
                element={<SuperAdminDashboardPage />}
              />
              <Route
                path="/super_admin_registered_admin_list"
                element={<SuperAdminRegisteredAdminsListPage />}
              />
              <Route
                path="/super_admin_registered_admin_profile"
                element={<SuperAdminRegisteredAdminProfilePage />}
              />
              <Route
                path="/super_admin_poster_page"
                element={<SuperAdmiPosterPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
};

export default App;
