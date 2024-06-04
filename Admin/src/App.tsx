import './App.css'
import Landing from './pages/LandingPage'
import Login from './pages/Login'
// import Landing from './pages/LandingPage'
import ServicePage from './pages/ServicePage'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup'

export default function App() {
  return (
   <div className="">

{/* <ServicePage /> */}
<BrowserRouter>
 <Routes>
  <Route path='/home' element={<Landing />} />
  <Route path='/service' element={<ServicePage />} />
  <Route path='/login' element={<Login/>} />
  <Route path='/signup' element={<Signup/>} />
 </Routes>
</BrowserRouter>


   </div>
  )
}