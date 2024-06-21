import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaCalendarDays, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store"; // Adjust the import according to your store's location

// Define the Conversation type
interface Conversation {
  _id: string;
  userId: string;
  adminId: string;
  propId: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: {
    text: string;
    time: string;
  };
}

const AdminChatListSection: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { currentAdmin } = useSelector((state: any) => state.admin);

  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/conversations_list', {
        params: {
          adminId: currentAdmin._id, 
          page: currentPage,
          filter: filter,
        },
      });
      setConversations(response.data.conversations);
      console.log(response.data.conversations);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [currentPage, filter]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  console.log(conversations)

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
              <span onClick={() => handleFilterChange('today')} className="cursor-pointer font-semibold text-white">Today</span>
              <span onClick={() => handleFilterChange('this_week')} className="cursor-pointer font-semibold text-white">This Week</span>
              <span onClick={() => handleFilterChange('this_month')} className="cursor-pointer font-semibold text-white">This Month</span>
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
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IoSearch className="absolute top-1/2 transform -translate-y-1/2 text-xl right-8" />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto h-[calc(100vh-270px)]">
            {conversations.map((conversation) => (
              <Link to={`/admin_chat/${conversation._id}`} key={conversation._id}>
                <div className="flex items-center justify-between border-2 p-4 rounded hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <img src="public/userIcon.webp" alt="User" className="h-14 w-14 rounded-full" />
                    <div className="flex flex-col">
                      {/* <h2 className="text-lg font-medium">{conversation?.userId?.username}</h2> */}
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

          <div className="flex justify-between items-center mt-4">
            <button
              className="p-2 bg-sky-500 text-white rounded"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className="p-2 bg-sky-500 text-white rounded"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatListSection;
