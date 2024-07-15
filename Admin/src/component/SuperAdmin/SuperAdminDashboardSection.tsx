import { FaSearch } from "react-icons/fa";
import SuperAdminBarGraph from "./SuperAdminBarGraph";
import SuperAdminLineGraph from "./SuperAdminLineGraph";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";

// type SuperAdminDataType = {
//   _id?: string;
//   email: string;
//   password: string;
// }


interface AdminDataTypes {
  _id?: string;
  username: string;
  email: string;
  phone: number;
  password: string;
  address?: string | null;
  state?: string | null;
  city?: string | null;
  pincode?: number | null;
  verified?: boolean
  firebaseConfirm?: string | null;
  image?: string
  landmark?: string
  fcmToken?: string
  createdAt?: number;
  updatedAt?: number
}


const SuperAdminDashboardSection = () => {
const [adminsData, setAdminsData] = useState<AdminDataTypes[] | null>();


  const fetchAdmins = async()=>{
    try {
      const response = await axios.get('/superAdmin/get_admin_data');

      
      console.log(response);
      setAdminsData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
 fetchAdmins();
  },[])

  console.log(adminsData)

  return (
    <div className="container mx-auto">
        <div className="absolute z-0 rounded-2xl -top-14 sm:ml-30 md:ml-28 lg:left-20 transform translate-x-1/2 -translate-y-1/2 bg-zinc-300 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>

 <div className="flex  mt-16 pl-8 flex-col w-full relative">

<div className="bg-white">
<SuperAdminLineGraph />
</div>

<div className="flex">
  <SuperAdminBarGraph />
</div>


<div className="flex justify-center rounded">
  <div className="flex flex-col border-2 rounded w-[400px] mx-6 md:mx-12 md:w-full ">
    <div className="flex justify-center bg-sky-500">
      <h1 className="text-white p-3">RECENT REGISTERED ADMINS</h1>
    </div>

    <div className="flex justify-start px-5 h-10 md:h-14">
     <div className="flex rounded justify-between items-center mt-2 border-2 h-8 p-2 md:w-[900px] md:h-12">
     <input type="text" className="mx-4 w-full h-full" placeholder="Search..."/>
     <FaSearch className="cursor-pointer mr-1 rounded text-zinc-500 md:text-2xl" />
     </div>
    </div>

    <table className="w-full text-left p-5 mt-4 text-xs md:text-sm lg:text-lg ">
              <thead>
                <tr>
                  <th className="p-2 border-b">ID</th>
                  <th className="p-2 border-b">NAME</th>
                  <th className="p-2 border-b">EMAIL</th>
                  <th className="p-2 border-b">DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {
                  adminsData && adminsData.map((data: AdminDataTypes)=>(
                    <tr key={data?._id}>
                  <td className="p-2 border-b">#{data?._id?.substring(0, 5)}</td>
                  <td className="p-2 border-b">{data?.username}</td>
                  <td className="p-2 border-b">{data?.email}</td>
                  <td className="p-2 border-b hover:text-sky-500 cursor-pointer"><Link to={`/super_admin_registered_admin_profile?adminId=${data._id}`}><IoIosSend className="text-lg md:text-2xl " /></Link></td>
                </tr>
                  ))
                }
                
              </tbody>
            </table>

  </div>
</div>

 </div>

    </div>
  )
}

export default SuperAdminDashboardSection;

