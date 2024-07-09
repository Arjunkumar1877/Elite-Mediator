import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useSocket } from "../../contexts/AdminContext";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlinePermMedia } from "react-icons/md";

interface Conversation {
  _id: string;
  userId: {
    username: string;
  };
  adminId: string;
  propertyId: string;
  createdAt?: string;
  updatedAt?: string;
  lastMessage?: {
    text: string;
    time: string;
    unread: number;
  };
}

const socket = io("http://localhost:7000");

const AdminChatListSection: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { currentAdmin } = useSelector((state: any) => state.admin);
  const { notificationCount, setNotificationCount }: any = useSocket();
  const [properties, setProperties] = useState<any[]>([]);
  const [propertyFilter, setPropertyFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchConversations = async () => {
    try {
      const response = await axios.get("/api/conversations_list", {
        params: {
          adminId: currentAdmin._id,
          page: currentPage,
          propertyFilter: propertyFilter,
          startDate: startDate,
          endDate: endDate,
        },
      });

      const fetchedConversations = response.data.conversations;
      setConversations(fetchedConversations);
      setTotalPages(response.data.totalPages);

      let total = 0;
      fetchedConversations.forEach((conversation: any) => {
        total += conversation.lastMessage.unread;
      });
      setNotificationCount(total);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchAdminsProperties = async () => {
    try {
      const res = await fetch(`/api/get_admin_properties/${currentAdmin._id}`);
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.log("Error fetching admin properties:", error);
    }
  };

  useEffect(() => {
    fetchConversations();
    fetchAdminsProperties();
  }, [currentPage, propertyFilter, startDate, endDate]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server with ID:", socket.id);
    });

    socket.on(
      "chat message",
      async (msg: any, convId: string, adminId: string) => {
        console.log(`Message received in room ${convId}: ${msg}`);

        try {
          await axios.put(`/api/conversations/${msg.conversationId}`, {
            lastMessage: {
              text: msg.text,
              time: msg.createdAt,
            },
          });

          socket.emit("chat message", msg, convId, currentAdmin._id);
          socket.emit("update conversation", adminId);
        } catch (error) {
          console.error("Error updating conversation:", error);
        }
      }
    );

    socket.on("update conversation", () => {
      fetchConversations();
      console.log(
        "updated the conversation 💕💕💕💕💕💕💕🤷‍♂️🤷‍♂️🤷‍♂️📀📀📀📀📀📀📀📀"
      );
    });

    return () => {
      socket.off("connect");
      socket.off("chat message");
      socket.off("update conversation");
    };
  }, [currentPage, propertyFilter, startDate, endDate]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    setSearchTerm(searchText);

    const filtered = conversations.filter((conversation) =>
      conversation.userId.username.toLowerCase().includes(searchText)
    );
    setConversations(filtered);
  };

  const handleFilterChatByProperty = (data: string) => {
    setSearchTerm("");
    setPropertyFilter(data);
  };

  const clearSearch = () => {
    setSearchTerm("");
    fetchConversations();
  };

  const getUserTypeBanner = (userType: string) => {
    let bannerColor = "";
    let bannerText = "";

    switch (userType) {
      case "Unknown":
        bannerColor = "bg-gray-600";
        bannerText = "Unknown";
        break;
      case "Unverified":
        bannerColor = "bg-yellow-500";
        bannerText = "Unverified";
        break;
      default:
        bannerColor = "bg-green-600";
        bannerText = "Verified";
        break;
    }

    return (
      <span
        className={`absolute top-0 left-0  ${bannerColor} text-white   text-xs font-semibold p-0.5 rounded`}
      >
        {bannerText}
      </span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="absolute z-0 rounded-2xl -top-64 left-1/2 transform -translate-x-1/2 bg-zinc-300 w-60 h-40 lg:h-96 rotate-45"></div>

      <div className="relative z-10 flex justify-between items-center p-3">
        <h1 className="text-2xl font-bold">Chats</h1>
      </div>

      <div className="relative z-10 p-2 flex flex-col justify-between border-2 rounded bg-white shadow-lg h-full overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row justify-between bg-sky-500 p-4 rounded">
            <div className="flex gap-4 lg:gap-16 justify-center items-center px-2 lg:px-5">
              <button
                onClick={() => handleFilterChatByProperty("All")}
                className="py-3 px-8 cursor-pointer text-sm rounded-full bg-white lg:px-16 hover:bg-slate-200"
              >
                All chats
              </button>
              <div className="flex relative">
                <select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleFilterChatByProperty(e.target.value)
                  }
                  className="py-3 bg-white px-8 lg:px-16 text-xs rounded-full"
                >
                  <option className="px-5" value="">
                    All Properties
                  </option>
                  {properties.map((prop: any) => (
                    <option className="px-5" key={prop._id} value={prop._id}>
                      {prop.propertyName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <label htmlFor="start-date" className="text-xs">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    name="start-date"
                    onChange={(e) => setStartDate(e.target.value)}
                    className="py-2 px-4 rounded-full border border-gray-300"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="end-date" className="text-xs">
                    End Date:
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    name="end-date"
                    onChange={(e) => setEndDate(e.target.value)}
                    className="py-2 px-4 rounded-full border border-gray-300"
                  />
                </div>
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

          <div className="flex flex-col gap-4 overflow-y-auto h-[380px]">
            {conversations &&
              conversations.map((conversation: any) => (
                <Link
                  to={`/admin_chat?conId=${conversation._id}`}
                  key={conversation._id}
                >
                  <div className="flex items-center justify-between border-2 p-4 rounded hover:bg-gray-100 transition relative">
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                      {getUserTypeBanner(conversation.propertyId.userType)}
                    </div>
                    <div className="flex items-center gap-3 relative z-10 mt-3">
                      <img
                        src="public/userIcon.webp"
                        alt="User"
                        className="h-14 w-14 rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="text-xs text-sky-500 md:text-sm">
                          ({conversation?.propertyId?.propertyName})
                        </p>
                        <p className="text-md text-gray-600 font-semibold md:text-xl">
                          {conversation?.userId?.username}
                        </p>
                        <p className="text-xs text-gray-400 md:text-sm">
                          {conversation?.lastMessage?.text?.startsWith(
                            "https://"
                          ) ? (
                            <div className="flex gap-1 justify-center items-center">
                              <MdOutlinePermMedia />
                              Media{" "}
                            </div>
                          ) : (
                            conversation?.lastMessage?.text
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-1">
                      <span className="text-xs md:text-md">
                        {new Date(
                          conversation?.lastMessage?.time as any
                        ).toLocaleTimeString()}
                      </span>
                      {(conversation?.lastMessage?.unread as number) > 0 && (
                        <span className="bg-sky-500 text-white w-6 h-6 rounded-full flex justify-center items-center">
                          {conversation?.lastMessage?.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              className="p-2 bg-sky-500 text-white rounded"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
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
