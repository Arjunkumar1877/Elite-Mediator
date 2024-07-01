import { IoSettingsOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaVideo, FaCheck, FaTimes, FaClock } from 'react-icons/fa';



function DashboardSection() {
  const [adminData, setAdminData] = useState<any>({})
  const { currentAdmin } = useSelector((state: any)=> state.admin);
  const [admincallList, setAdminCallList] = useState<any>()

  const fetchCalls = async()=>{
    try {
      const res = await fetch(`/api/get_calls/${currentAdmin._id}`);
      const data: any = await res.json();

      if(data){
        setAdminCallList(data)
      }

    } catch (error) {
      console.log(error)
    }
  }




 useEffect(()=>{
  fetchCalls();
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

  console.log(adminData);
  console.log(admincallList)

  return (
    <div className="container mx-auto p-4">
      <div className="mb-5">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-col gap-5 xl:flex-row">
      <div className="p-4 w-full lg:w-1/3 border-2 rounded-lg">
        <div className="flex justify-end p-2 cursor-pointer">
          <Link to={'/editprofile'}>
            <IoSettingsOutline className="text-xl text-sky-500 hover:text-sky-700" />
          </Link>
        </div>
        <div className="flex justify-center">
          <img src={`${adminData?.image ? adminData?.image : 'public/userIcon.webp'}`} alt="User Icon" className="rounded-full w-36 h-36 object-cover" />
        </div>
        <div className="flex flex-col items-center mt-3">
          <h1 className="text-xl">{adminData?.username}</h1>
          <p className="text-xs text-zinc-400">{adminData?.email}</p>
        </div>
        <hr className="w-full mt-4" />
        <div className="flex justify-center items-center py-3">
          <p>
            Address: <span className="text-xs text-zinc-400">{adminData?.address}</span>
          </p>
        </div>
      </div>
      <div className="flex-1 w-full p-4 border-2 rounded-lg lg:w-2/3">
        <div className="mb-3">
          <h2 className="text-xl font-bold">Your Activity</h2>
        </div>
        <div className="h-64 bg-gray-100 flex justify-center items-center">
          <p>📈📉📊💹</p>
        </div>
      </div>
    </div>

      <div className="flex flex-col gap-5 mt-5 lg:flex-row">


      <div className="p-4 w-full lg:w-1/3 border-2 rounded-lg shadow-lg bg-white">
      <div className="flex justify-between items-center px-5 py-2 border-b cursor-pointer">
        <h2 className="text-2xl font-bold">Recent Calls</h2>
        <h3 className="text-sky-500 font-bold">(10) All</h3>
      </div>
      <div className="overflow-y-scroll max-h-96">
        {admincallList &&
          admincallList.map((calls: any) => (
            <div
              key={calls._id}
              className="flex items-center h-[70px] rounded-lg justify-between border-b mt-2 p-2 hover:bg-gray-100"
            >
              <div className="flex flex-col w-2/3">
                <span className="text-xs md:text-sm text-gray-500">
                  {new Date(calls.createdAt).toLocaleString()}
                </span>
                <span className="text-sm md:text-lg font-semibold">{calls?.userId?.username}</span>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                  {calls.caller === 'Admin' ? (
                    <FaPhone className="text-blue-500" />
                  ) : (
                    <FaClock className="text-green-500" />
                  )}
                  <span>
                    {calls.caller === 'Admin' ? 'Outgoing' : 'Incoming'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 w-1/3">
                <div className="flex items-center gap-2">
                  {calls.callType === 'video' ? (
                    <FaVideo className="text-red-500" />
                  ) : (
                    <FaPhone className="text-green-500" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {calls.callStatus === 'answered' && <FaCheck className="text-green-500" />}
                  {calls.callStatus === 'declined' && <FaTimes className="text-red-500" />}
                  {calls.callStatus !== 'answered' &&
                    calls.callStatus !== 'declined' && (
                      <FaClock className="text-yellow-500" />
                    )}
                  <span className="text-xs md:text-sm">
                    {calls.callStatus === 'answered'
                      ? 'Answered'
                      : calls.callStatus === 'declined'
                      ? 'Declined'
                      : 'Missed'}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>

        <div className="flex-1 p-4 border-2 rounded-lg">
          <div className="flex justify-between items-center px-5 py-2">
            <h2 className="text-lg font-bold lg:text-2xl">Recent Visitors</h2>
            <p className="text-sky-500 text-sm font-bold">(10) All</p>
          </div>
          <hr className="w-full mt-4" />
          <div className="overflow-y-scroll max-h-96">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-4 border-2 p-3 rounded-lg gap-4 mt-4">
                <div>
                  <h3 className="font-bold">Date</h3>
                  <p>06/09/2024</p>
                </div>
                <div>
                  <h3 className="font-bold">Time</h3>
                  <p>05:30AM</p>
                </div>
                <div>
                  <h3 className="font-bold">Name</h3>
                  <p>Arjun Kumar VS</p>
                  <h3 className="font-bold mt-2">Purpose</h3>
                  <p>I came simply to see you</p>
                  <h3 className="font-bold mt-2">Phone</h3>
                  <p>8714251877</p>
                </div>
                <div className="flex justify-end items-center text-2xl p-1 cursor-pointer hover:text-slate-500">
                  <FaRegTrashCan />
                  <span>delete</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSection;
