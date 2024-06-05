import './App.css'
import Landing from './component/LandingPage'
import Login from './pages/Login'
// import Landing from './pages/LandingPage'
import ServicePage from './component/ServicePage'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup'
import OtpVerification from './pages/VerifyOtp'
import UserVerifyData from './pages/UserVerifyData'
import ProfilePage from './component/ProfilePage'
import EditProfilePage from './component/EditProfilePage'

export default function App() {
  return (
   <div className="">

{/* <ServicePage /> */}
<BrowserRouter>
 <Routes>
  <Route path='/' element={<Landing />} />
  <Route path='/service' element={<ServicePage />} />
  <Route path='/login' element={<Login/>} />
  <Route path='/signup' element={<Signup/>} />
  <Route path='/otpverify' element={<OtpVerification/>} />
  <Route path='/admin-data' element={<UserVerifyData/>} />

  <Route path='/profile' element={<ProfilePage />} />
  <Route path='/editprofile' element={<EditProfilePage/>}/>
 </Routes>
</BrowserRouter>


   </div>
  )
}