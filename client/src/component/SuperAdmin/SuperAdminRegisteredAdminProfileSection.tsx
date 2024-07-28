import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

interface AdminDataTypes {
  _id?: string;
  username: string;
  email: string;
  phone: number;
  password: string;
  address?: string | any;
  state?: string | any;
  city?: string | any;
  pincode?: number | any;
  verified?: boolean
  firebaseConfirm?: string | any;
  image?: string
  landmark?: string
  fcmToken?: string
  createdAt?: number;
  updatedAt?: number
  blocked: boolean;
}


type UserDataType = {
  adminId: string;
  conversationId: string;
  createdAt: string;
  deleted: false;
  firebaseCode: string;
  phone: number;
  propId: string;
  purpose: string;
  updatedAt?: number;
  userId: string;
  username: string;
  verified?: boolean;
  _id?: string;
  fcmToken: string;
};


const SuperAdminRegisteredAdminProfileSection = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const adminId: any = query.get("adminId");
  const [adminProfileData, setAdminProfileData]  = useState<AdminDataTypes>();
  const [userType, setUserType] = useState<string>("All");
  const [adminsVisitors, setAdminsVisitors] = useState<UserDataType[] | null>()

  const fetchAdminProfile = async()=>{
    try {
      const res = await axios.get(`/superAdmin/get_admin_profile/${adminId}`)
      setAdminProfileData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAdminsVisitors = async () => {
    try {
      const response = await axios.post('/superAdmin/get_admin_visitors', {
        adminId: adminId,
        userType: userType
      });
  
      console.log(response)
      setAdminsVisitors(response.data);
    } catch (error) {
      console.error('Error fetching admin visitors:', error);
    }
  };

  const formatDateTime = (dateString: any) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString([], options);
  };

  const handleUnBlockAdmins = async(id: string | undefined)=>{
    const res = await axios.get(`/superAdmin/unblock_an_admin/${id}`)
    if(res.data.unblocked){
      toast("Admin was sucessfully unblocked");
      fetchAdminProfile()
    }else{
      toast("failed unblocking admin")
    }
  }

  const confirmAdminBlock = (id: string | undefined) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to block this Admin from accesing his account ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
     handleBlockadmins(id)
       
      }
    });
  };

  const handleBlockadmins  = async(id: string | undefined)=>{
      const res = await axios.get(`/superAdmin/block_an_admin/${id}`);

      if(res.data.blocked){
        Swal.fire("Admin was sucessfully blocked..");
        fetchAdminProfile()
      }else{
        toast("Failed blocking the admin");
      }
  }

  const confirmAdminUnBlock = (id: string | undefined) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to block this Admin from accesing his account ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
     handleUnBlockAdmins(id)
       
      }
    });
  };

  

  useEffect(()=>{
  fetchAdminProfile();
  fetchAdminsVisitors();
  },[userType])

  // console.log(adminProfileData);
  console.log(userType)
  console.log(adminId)
  console.log(adminsVisitors)

  return (
    <div className="container mx-auto">
      <div className="absolute z-0 rounded-2xl -top-14 sm:ml-30 md:ml-28 lg:left-20 transform translate-x-1/2 -translate-y-1/2 bg-zinc-300 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>
      <div className="flex flex-col  p-3 ">
        <h1 className="p-5 text-3xl relative z-10 font-bold">Profile Info</h1>

        <div className="flex flex-col border-2 rounded relative z-30">
          <div className="flex flex-col md:flex-row justify-between items-center px-28 py-3">
            <div className="flex justify-center">
              <img src={adminProfileData?.image} className="w-32 md:w-50 rounded " alt="" />
            </div>
            <div className="flex justify-end w-15 h-8 md:w-20 m-2">
             {
              adminProfileData && adminProfileData.blocked ?  <button onClick={()=> confirmAdminUnBlock(adminProfileData?._id)} className="p-1 bg-red-500 w-full rounded text-white hover:bg-red-900 ">
              Unblock
            </button> :    <button onClick={()=> confirmAdminBlock(adminProfileData?._id)} className="p-1 bg-red-500 w-full rounded text-white hover:bg-red-900 ">
                Block
              </button>
             }

           
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex flex-col w-[350px] mx-auto">
              <div className="flex justify-between px-5">
                <span className="text-zinc-500">Name</span>
                <div className="flex justify-center items-center gap-1">
                  <BsCheckCircleFill className="text-green-600 text-sm" />
                  <span className=" text-green-600">Valid</span>
                </div>
              </div>

              <div className="flex relative mx-auto w-full">
                <FaRegUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input disabled
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-900 py-2 px-4 md:py-3 md:px-5"
                  placeholder={adminProfileData?.username}
                />
              </div>
            </div>

            <div className="flex flex-col w-[350px] mx-auto">
              <div className="flex justify-between px-5">
                <span className="text-zinc-500">Email</span>
                <div className="flex justify-center items-center gap-1">
                  <BsCheckCircleFill className="text-green-600 text-sm" />
                  <span className=" text-green-600">Valid</span>
                </div>
              </div>

              <div className="flex relative mx-auto w-full">
                <FaRegUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input disabled
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-900 py-2 px-4 md:py-3 md:px-5"
                  placeholder={adminProfileData?.email}
                />
              </div>
            </div>

            <div className="flex flex-col w-[350px] mx-auto">
              <div className="flex justify-between px-5">
                <span className="text-zinc-500">Address</span>
                <div className="flex justify-center items-center gap-1">
                  <BsCheckCircleFill className="text-green-600 text-sm" />
                  <span className=" text-green-600">Valid</span>
                </div>
              </div>

              <div className="flex relative mx-auto w-full">
                <FaRegUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input disabled
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-900 py-2 px-4 md:py-3 md:px-5"
                  placeholder={adminProfileData && adminProfileData?.address}
                />
              </div>
            </div>

            <div className="flex flex-col w-[350px] mx-auto">
              <div className="flex justify-between px-5">
                <span className="text-zinc-500">Phone</span>
                <div className="flex justify-center items-center gap-1">
                  <BsCheckCircleFill className="text-green-600 text-sm" />
                  <span className=" text-green-600">Valid</span>
                </div>
              </div>

              <div className="flex relative mx-auto w-full">
                <FaRegUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input disabled
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-900 py-2 px-4 md:py-3 md:px-5"
                  placeholder={`${adminProfileData?.phone}`}
                />
              </div>
            </div>

            <div className="flex flex-col w-[350px] mx-auto">
              <div className="flex justify-between px-5">
                <span className="text-zinc-500">State</span>
                <div className="flex justify-center items-center gap-1">
                  <BsCheckCircleFill className="text-green-600 text-sm" />
                  <span className=" text-green-600">Valid</span>
                </div>
              </div>

              <div className="flex relative mx-auto w-full">
                <FaRegUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input disabled
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-900 py-2 px-4 md:py-3 md:px-5"
                  placeholder={adminProfileData?.state}
                />
              </div>
            </div>

            <div className="flex flex-col w-[350px] mx-auto">
              <div className="flex justify-between px-5">
                <span className="text-zinc-500">City</span>
                <div className="flex justify-center items-center gap-1">
                  <BsCheckCircleFill className="text-green-600 text-sm" />
                  <span className=" text-green-600">Valid</span>
                </div>
              </div>

              <div className="flex relative mx-auto w-full">
                <FaRegUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input disabled
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-900 py-2 px-4 md:py-3 md:px-5"
                  placeholder={adminProfileData?.city}
                />
              </div>
            </div>

            <div className="flex flex-col w-[350px] mx-auto">
              <div className="flex justify-between px-5">
                <span className="text-zinc-500">Landmark</span>
                <div className="flex justify-center items-center gap-1">
                  <BsCheckCircleFill className="text-green-600 text-sm" />
                  <span className=" text-green-600">Valid</span>
                </div>
              </div>

              <div className="flex relative mx-auto w-full">
                <FaRegUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input disabled
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-900 py-2 px-4 md:py-3 md:px-5"
                  placeholder={adminProfileData?.landmark}
                />
              </div>
            </div>

            <div className="flex flex-col w-[350px] mx-auto">
              <div className="flex justify-between px-5">
                <span className="text-zinc-500">Pincode</span>
                <div className="flex justify-center items-center gap-1">
                  <BsCheckCircleFill className="text-green-600 text-sm" />
                  <span className=" text-green-600">Valid</span>
                </div>
              </div>

              <div className="flex relative mx-auto w-full">
                <FaRegUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input disabled
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-900 py-2 px-4 md:py-3 md:px-5"
                  placeholder={adminProfileData?.pincode}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col p-5  px-5">
            <div className="flex justify-between border-2 rounded py-5 px-20">
              <h1 className="rounded-full py-1 font-bold text-lg md:text-xl">
                All Visitors
              </h1>
              <select
  value={userType}
  id="userTypeSelect"
  className="bg-sky-500 text-white rounded-full md:py-1 md:px-5"
  onChange={(e) => setUserType(e.target.value)}
>
  <option value="All">All Visitors</option>
  <option value="Verified">Verified Visitors</option>
  <option value="Unverified">Unverified Visitors</option>
  <option value="Unknown">Unknown Visitors</option>
</select>

            </div>

            <table className="w-full text-left p-5 mt-4 text-xs md:text-sm lg:text-lg ">
              <thead>
                <tr>
                  <th className="p-2 border-b">ID</th>
                  <th className="p-2 border-b">Visited at</th>
                  <th className="p-2 border-b">NAME</th>
                  <th className="p-2 border-b">PURPOSE</th>
                  <th className="p-2 border-b">PHONE</th>
                </tr>
              </thead>
              <tbody>
             {
              adminsVisitors && adminsVisitors.length > 0 ? adminsVisitors.map((data)=> (
                <tr>
                <td className="p-2 border-b">#{data._id?.substring(0,5)}</td>
                <td className="p-2 border-b">{formatDateTime(data.createdAt)}</td>
                <td className="p-2 border-b">{data.username}</td>
                <td className="p-2 border-b">{data.purpose}</td>
                <td className="p-2 border-b">{data.phone !== 0 ? data.phone: "Unknown"}</td>
              </tr>
              )) : (
             <div className="flex justify-center text-4xl p-6 font-bold">
              No users visited
             </div>
              )
             }
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminRegisteredAdminProfileSection;
