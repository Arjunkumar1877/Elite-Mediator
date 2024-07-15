import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";
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


const SuperAdminRegisteredAdminsListSection = () => {
  const [adminsData, setAdminsData] = useState<AdminDataTypes[] | null>();
  const [searchTerm, setSearchTerm] = useState<string>('');


  const fetchAdmins = async()=>{
    try {
      const response = await axios.get('/superAdmin/get_all_admins_data');

      
      console.log(response);
      setAdminsData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const filteredAdminData = adminsData?.filter((data)=> 
    data.username.toLowerCase().includes(searchTerm?.toLocaleLowerCase())
  )

  useEffect(()=>{
 fetchAdmins();
  },[])

  console.log(adminsData)
  return (
    <div className="container mx-auto">
      <div className="absolute z-0 rounded-2xl -top-14 sm:ml-30 md:ml-28 lg:left-20 transform translate-x-1/2 -translate-y-1/2 bg-zinc-300 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>

      <div className="flex flex-col gap-5 p-6 mt-5 relative z-10">
        <h1 className="text-2xl font-bold text-center">All Admins</h1>

        <div className="relative z-30">
          <div className="flex flex-col border-2 shadow-lg rounded-lg bg-white">

            <div className="flex gap-1 justify-between items-center bg-sky-500 p-4 rounded-t-lg">
              <div className="cursor-pointer px-1 text-white hover:text-black">(All)</div>

              <div className="flex justify-between gap-2 items-center">
                <div className="flex bg-sky-100 p-1 rounded-full md:px-5">
                  <input type="date" className="bg-sky-100 rounded-full outline-none" />
                </div>
                <div className="flex bg-sky-100 p-1 rounded-full md:px-5">
                  <input type="date" className="bg-sky-100 rounded-full outline-none" />
                </div>
                <div className="flex">
                  <button className="text-white hover:text-black hover:bg-white hover:rounded-full hover:p-1 transition duration-300">Apply</button>
                </div>
              </div>
            </div>

            <div className="flex my-2 px-5">
              <div className="flex rounded justify-between items-center mt-2 border-2 p-2 w-full shadow-md">
                <input type="text" className="mx-4 w-full h-full outline-none" onChange={(e)=> setSearchTerm(e.target.value)} placeholder="Search..." />
                <FaSearch className="cursor-pointer mr-1 rounded text-zinc-500 md:text-2xl" />
              </div>
            </div>

            <div className="flex flex-col justify-between h-[450px] border-2 rounded-b-lg overflow-hidden shadow-lg">
              <table className="w-full text-left p-5 mt-4 text-xs md:text-sm lg:text-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border-b">ID</th>
                    <th className="p-2 border-b">NAME</th>
                    <th className="p-2 border-b">EMAIL</th>
                    <th className="p-2 border-b">PHONE</th>
                    <th className="p-2 border-b">DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                 {
                  filteredAdminData && filteredAdminData.length  > 0 ? filteredAdminData.map((data)=> (
                    <tr className="even:bg-gray-50" key={data._id}>
                    <td className="p-2 border-b">#{data._id?.substring(0,6)}</td>
                    <td className="p-2 border-b">{data.username}</td>
                    <td className="p-2 border-b">{data.email}</td>
                    <td className="p-2 border-b">{data.phone}</td>
                    <td className="p-2 border-b hover:text-sky-500 cursor-pointer"><Link to={`/super_admin_registered_admin_profile?adminId=${data._id}`}><IoIosSend className="text-lg md:text-2xl" /></Link></td>

                  </tr>
                  )) : (
                    <div className="flex justify-center text-4xl p-6 font-bold">
                    No Data available
                   </div>
                  )
                 }
                
                </tbody>
              </table>

              <div className="flex justify-between items-center p-4 bg-gray-50">
                <button
                  className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-300"
                  // onClick={handlePreviousPage}
                  // disabled={currentPage === 1}
                >
                  <FaArrowLeft />
                </button>
                <span>
                  Page {0} of {3}
                </span>
                <button
                  className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-300"
                  // onClick={handleNextPage}
                  // disabled={currentPage === totalPages}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminRegisteredAdminsListSection;
