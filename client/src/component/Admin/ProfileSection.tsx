import { MdOutlineMail } from "react-icons/md";
import { IoSettingsOutline } from 'react-icons/io5';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaRegUser } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { requestPermission } from "../../firebase/firebase";
import { signInSuccess } from "../../redux/admin/adminSlice";






const ProfileSection = () => {
  const { currentAdmin } = useSelector((state: any)=> state.admin);
  const [adminData, setAdminData] = useState<any>();
  const dispatch = useDispatch();

  const fetchOrSaveFcmToken = async()=>{
   const token:any = await requestPermission();
   const res = await fetch('/api/admin_add_or_get_fcmtoken', {
    method: "POST",
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({token: token, adminId: currentAdmin._id})
   })

   

   const data: any = await res.json();
   console.log(data);
console.log("fcm updated succesfully ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️")
   if(data){
    dispatch(signInSuccess(data))
   }

   
  }

  useEffect(()=>{
   
    fetchOrSaveFcmToken();
    const fetchUser = async()=>{
    const res = await fetch(`/api/get_admin/${currentAdmin._id}`);

    if(res.ok){
      const data = await res.json();
      console.log(data)
      setAdminData(data);
    }else{
      console.log("Error fetching admin data")
    }
    }
    fetchUser()
  },[])

  console.log(adminData)

  return (
    <div className="w-full h-screen flex flex-col relative z-10 overflow-x-hidden">
  <div className="p-6 bg-white shadow-sm">
    <h1 className="text-3xl font-bold">Account Information</h1>
  </div>

  <div className="flex flex-col items-center p-6 overflow-y-auto bg-gray-100 relative z-20">
    <div className="absolute z-0 rounded-2xl -top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-300 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>
    <div className="absolute z-0 rounded-2xl left-1/2 lg:-right-10 lg:top-96 transform -translate-x-1/2 -translate-y-1/2 bg-sky-500 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>

    <div className="flex flex-col justify-center relative z-20 items-center w-full bg-white rounded-md shadow-md p-6 md:p-8 lg:p-10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full mb-10 px-10">
        <div className="mb-6 md:mb-0">
          <img
            src={adminData?.image}
            alt="User Icon"
            className="h-24 w-24 rounded-full  border-2 md:h-32 md:w-32 lg:h-48 lg:w-48  object-cover"
          />
        </div>

        <Link to={'/editprofile'}>
          <div className="flex flex-col md:flex-row text-zinc-400 items-center md:items-end justify-end w-full text-center md:text-right cursor-pointer hover:text-zinc-800">
          <button className="bg-sky-500 text-white px-4 flex py-1 gap-1 rounded lg:py-2 lg:px-4 lg:gap-2">
          <span className="">Edit</span><IoSettingsOutline className='self-center' />

          </button>
            
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 w-full">
        <div className="flex flex-col w-full px-2 py-3 md:px-3 md:py-4 lg:px-5 lg:py-5 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-gray-500 text-lg md:text-xl">Name</span>
            <div className="flex items-center gap-2">
              <BsCheckCircleFill className="text-green-600 text-sm" />
              <span className="text-xs text-green-500">Valid</span>
            </div>
          </div>
          <div className="flex relative">
            <FaRegUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
            <input
              type="text"
              className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
              placeholder={adminData && adminData?.username}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col w-full px-2 py-3 md:px-3 md:py-4 lg:px-5 lg:py-5 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-gray-500 text-lg md:text-xl">Email</span>
            <div className="flex items-center gap-2">
              <BsCheckCircleFill className="text-green-600 text-sm" />
              <span className="text-xs text-green-500">Valid</span>
            </div>
          </div>
          <div className="flex relative">
            <MdOutlineMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
            <input
              type="text"
              className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
              placeholder={adminData && adminData?.email}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col w-full px-2 py-3 md:px-3 md:py-4 lg:px-5 lg:py-5 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-gray-500 text-lg md:text-xl">Address</span>
            <div className="flex items-center gap-2">
              <BsCheckCircleFill className="text-green-600 text-sm" />
              <span className="text-xs text-green-500">Valid</span>
            </div>
          </div>
          <div className="flex relative">
            <FaRegAddressCard className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
            <input
              type="text"
              className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
              placeholder={adminData && adminData?.address}
              disabled
            />
          </div>
        </div>

{
  adminData?.phone.toString().length <= 12 &&         <div className="flex flex-col w-full px-2 py-3 md:px-3 md:py-4 lg:px-5 lg:py-5 rounded-md shadow-sm">
  <div className="flex justify-between items-center mb-4 px-2">
    <span className="text-gray-500 text-lg md:text-xl">Phone</span>
    <div className="flex items-center gap-2">

        <>
         <BsCheckCircleFill className="text-green-600 text-sm" />
         <span className="text-xs text-green-500">Valid</span>
        </>
 
     
    </div>
  </div>
  <div className="flex relative">
    <FiPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
    <input
      type="text"
      className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
      placeholder={adminData?.phone}
      disabled
    />
  </div>
</div> 
}

        <div className="flex flex-col w-full px-2 py-3 md:px-3 md:py-4 lg:px-5 lg:py-5 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-gray-500 text-lg md:text-xl">State</span>
            <div className="flex items-center gap-2">
              <BsCheckCircleFill className="text-green-600 text-sm" />
              <span className="text-xs text-green-500">Valid</span>
            </div>
          </div>
          <div className="flex relative">
            <MdOutlineEditLocationAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
            <input
              type="text"
              className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
              placeholder={adminData && adminData?.state}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col w-full px-2 py-3 md:px-3 md:py-4 lg:px-5 lg:py-5 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-gray-500 text-lg md:text-xl">City</span>
            <div className="flex items-center gap-2">
              <BsCheckCircleFill className="text-green-600 text-sm" />
              <span className="text-xs text-green-500">Valid</span>
            </div>
          </div>
          <div className="flex relative">
            <MdMyLocation className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
            <input
              type="text"
              className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
              placeholder={adminData && adminData?.city}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col w-full px-2 py-3 md:px-3 md:py-4 lg:px-5 lg:py-5 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-gray-500 text-lg md:text-xl">Landmark</span>
            <div className="flex items-center gap-2">
              <BsCheckCircleFill className="text-green-600 text-sm" />
              <span className="text-xs text-green-500">Valid</span>
            </div>
          </div>
          <div className="flex relative">
            <MdMyLocation className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
            <input
              type="text"
              className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
              placeholder={adminData && adminData?.landmark}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col w-full px-2 py-3 md:px-3 md:py-4 lg:px-5 lg:py-5 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-gray-500 text-lg md:text-xl">Pincode</span>
            <div className="flex items-center gap-2">
              <BsCheckCircleFill className="text-green-600 text-sm" />
              <span className="text-xs text-green-500">Valid</span>
            </div>
          </div>
          <div className="flex relative">
            <MdMyLocation className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
            <input
              type="text"
              className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
              placeholder={adminData && adminData?.pincode}
              disabled
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

  );
};

export default ProfileSection;
