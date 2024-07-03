import { useEffect, useState } from "react";
import {  FaRegTrashAlt,} from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { CiChat1 } from "react-icons/ci";

import { IoSearch, IoCallOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersListSection = () => {
    const [usersList, setUsersList] = useState<any>();
    const { currentAdmin } = useSelector((state: any)=> state.admin);
    useEffect(()=>{
    const fetchData = async()=>{
        const res = await fetch(`/api/get_users_list/${currentAdmin._id}`);
        if(res.ok){
            const data = await res.json();
            if(data !== 'Empty list'){
              setUsersList(data);

            }
        }
    }

    fetchData();
    },[])

    console.log(usersList)
  return (
    <div className="p-4 h-screen overflow-hidden">
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold p-4">All Visitors</h1>

        <div className="flex flex-col border w-full p-4 rounded-lg gap-4 bg-white shadow-lg h-full">
          <div className="flex flex-col md:flex-row justify-between px-7 py-5 bg-sky-500 rounded-lg">
            <div className="flex justify-center gap-7 text-white">
              <span className="cursor-pointer">Today</span>
              <span className="cursor-pointer">This Week</span>
              <span className="cursor-pointer">This Month</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-7 mt-4 md:mt-0">
              <div className="flex items-center gap-2 p-2 bg-white rounded-full text-xs md:text-sm md:px-5 shadow-sm">
                PropertyName
                <select className="bg-transparent border-none outline-none">
                  <option value="hey">Option</option>
                </select>
              </div>

              <div className="flex items-center gap-2 p-2 bg-white rounded-full text-xs md:text-sm md:px-5 shadow-sm">
                <span>Custom Date</span>
                
              </div>
            </div>
          </div>

          <div className="flex items-center border p-2 px-5 rounded-lg bg-gray-100 shadow-sm">
            <input
              type="text"
              className="flex-grow border-none focus:outline-none px-5 bg-transparent"
              placeholder="Search..."
            />
            <IoSearch className="text-gray-500" />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto flex-grow mt-4">
            {usersList && usersList.map((user: any) => (
              <div key={user?._id} className="flex flex-col border p-4 rounded-lg gap-4 shadow-sm bg-gray-50">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-4 px-5 py-2 bg-white border rounded-lg shadow-sm flex-grow">
                    <h3 className="font-semibold">Visited on</h3>
                    <span>{new Date(user?.createdAt).toLocaleDateString()}    ---  {new Date(user?.createdAt).toLocaleTimeString()}  </span>
                  </div>

                 <Link to={`/admin_chat?conId=${user?.conversationId}`}>
                 <button className="flex items-center gap-1 text-white bg-sky-500 px-4 py-2 rounded-lg shadow-sm w-24 justify-center">
                    <CiChat1 />
                    Chats
                  </button>
                 </Link>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-4 px-5 py-2 bg-white border rounded-lg shadow-sm flex-grow">
                    <h3 className="font-semibold">Name</h3>
                    <span>{user?.username}</span>
                  </div>

                  <button className="flex items-center gap-1 text-white bg-red-500 px-4 py-2 rounded-lg shadow-sm w-24 justify-center">
                    <FaRegTrashAlt />
                    Delete
                  </button>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-4 px-5 py-2 bg-white border rounded-lg shadow-sm flex-grow">
                    <h3 className="font-semibold">Purpose</h3>
                    <span>{user?.purpose}</span>
                  </div>
                  <a href={`https://wa.me/${user?.phone}`} className="flex items-center gap-1 text-white text-xs bg-green-500 px-4 py-3 rounded-lg shadow-sm w-24 justify-center" target="_blank" rel="noopener noreferrer">
  <FaWhatsapp className="text-white" />
  Message
</a>

                </div>

                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-4 px-5 py-2 bg-white border rounded-lg shadow-sm flex-grow">
                    <h3 className="font-semibold">Phone</h3>
                    <span>{user?.phone}</span>
                  </div>
                  <a href={`tel:${user?.phone}`} className="flex items-center gap-1 text-white bg-sky-500 px-4 py-2 rounded-lg shadow-sm w-24 justify-center">
  <IoCallOutline />
  Call
</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersListSection;
