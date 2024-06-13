import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaCalendarDays } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminChatListSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // This is an example; replace it with the actual number of pages

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="absolute z-0 rounded-2xl -top-64 left-1/2 transform -translate-x-1/2 bg-zinc-300 w-60 h-40 lg:h-96 rotate-45"></div>

      <div className="relative z-10 flex justify-between items-center mb-10 mt-6">
        <h1 className="text-2xl mt-6 font-bold">Chats</h1>
      </div>

      <div className="relative z-10 p-2 flex flex-col justify-between border-2 rounded bg-white shadow-lg h-[calc(100vh-150px)] overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row justify-between bg-sky-500 p-4 rounded">
            <div className="flex gap-4 lg:gap-16 justify-center items-center px-2 lg:px-5">
              <span className="cursor-pointer font-semibold text-white">Today</span>
              <span className="cursor-pointer font-semibold text-white">This Week</span>
              <span className="cursor-pointer font-semibold text-white">This Month</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0">
              <div className="flex relative">
                <button className="py-2 bg-white px-8 lg:px-16 text-xs rounded-full">
                  Property Name
                </button>
                <IoIosArrowDropdownCircle className="absolute cursor-pointer right-4 top-2 text-lg" />
              </div>
              <div className="flex relative">
                <button className="py-2 bg-white px-8 lg:px-16 text-xs rounded-full">
                  Custom Date
                </button>
                <FaCalendarDays className="absolute cursor-pointer right-4 top-2 text-lg" />
              </div>
            </div>
          </div>

          <div className="flex relative">
            <input
              type="text"
              className="p-4 border-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Search..."
            />
            <IoSearch className="absolute top-1/2 transform -translate-y-1/2 text-xl right-8" />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto h-[calc(100vh-270px)]">
            {[...Array(8)].map((_, index) => (
              <Link to={"/admin_chat/123"} key={index}>
                <div className="flex items-center justify-between border-2 p-4 rounded hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <img src="public/userIcon.webp" alt="User" className="h-14 w-14 rounded-full" />
                    <div className="flex flex-col">
                      <h2 className="text-lg font-medium">Arjun Kumar VS</h2>
                      <p className="text-sm text-gray-600">hai, how are you</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center gap-1">
                    <span className="text-sm">12:58 PM</span>
                    <span className="bg-sky-500 text-white w-6 h-6 rounded-full flex justify-center items-center">
                      3
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

     
      </div>

    </div>
  );
};

export default AdminChatListSection;
