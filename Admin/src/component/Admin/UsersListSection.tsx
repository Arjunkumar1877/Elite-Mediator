import { useEffect, useState, ChangeEvent } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { CiChat1 } from "react-icons/ci";
import { IoSearch, IoCallOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UsersListSection = () => {
  const [usersList, setUsersList] = useState<any[]>([]);
  const { currentAdmin } = useSelector((state: any) => state.admin);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [propertyNameFilter, setPropertyNameFilter] = useState<string>("");
  const [userTypeFilter, setUserTypeFilter] = useState<string>("");
  const [properties, setProperties] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchAdminsProperties();
    fetchFileredUserData();
  }, [currentAdmin, propertyNameFilter, userTypeFilter]);


  


  const fetchFileredUserData = async () => {
    try {
      const response = await axios.get("/api/get_users_list", {
        params: {
          adminId: currentAdmin._id,
          startDate: startDate,
          endDate: endDate,
          propertyName: propertyNameFilter,
          userType: userTypeFilter,
        },
      });
      if (response.data !== "Empty list") {
        setUsersList(response.data);
      } else {
        setUsersList([]);
        toast("Filtered user list empty");
      }
    } catch (error) {
      console.error("Error fetching users list:", error);
    }
  };

  const fetchAdminsProperties = async () => {
    try {
      const res = await fetch(
        `/api/get_admin_property_data/${currentAdmin._id}`
      );
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.log("Error fetching admin properties:", error);
    }
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    if (new Date(newStartDate) > new Date(endDate)) {
      toast.error("Start date cannot be later than end date.");
    } else {
      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    if (new Date(startDate) > new Date(newEndDate)) {
      toast.error("End date cannot be earlier than start date.");
    } else {
      setEndDate(newEndDate);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsersList = usersList.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterByDate = () => {
    console.log("filtering by date");
    if (startDate && endDate) {
      fetchFileredUserData();
    } else {
      toast.error("please select the dates..");
    }
  };

  console.log(filteredUsersList)

  return (
    <div className="p-4 h-screen overflow-hidden">
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold p-4">All Visitors</h1>

        <div className="flex flex-col border w-full p-4 rounded-lg gap-4 bg-white shadow-lg h-full">
         
          <div className="flex flex-col lg:flex-row justify-between bg-sky-500 p-4 rounded">
            <div className="flex gap-16 lg:gap-16 justify-center items-center px-2 lg:px-5">
              <div className="flex relative">
                <select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setUserTypeFilter(e.target.value);
                    setPropertyNameFilter("");

                    setEndDate("");
                    setStartDate("");
                  }}
                  className="py-3 px-2 bg-white lg:px-16 text-xs rounded-full cursor-pointer"
                >
                  {/* <option value="All">Select user type</option> */}
                  <option value="All">All Users</option>
                  <option value="Unknown">Unknown</option>
                  <option value="Unverified">Unverified</option>
                  <option value="Verified">Verified</option>
                </select>
              </div>
              <div className="flex relative">
                <select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setPropertyNameFilter(e.target.value);
                    setUserTypeFilter("");
                    setEndDate("");
                    setStartDate("");
                  }}
                  className="py-3 px-2 bg-white lg:px-16 text-xs rounded-full cursor-pointer"
                >
                  {/* <option value="All">Select property</option> */}
                  <option value="All">All Properties</option>
                  {properties.map((prop: any) => (
                    <option key={prop._id} value={prop._id}>
                      {prop.propertyName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0 bg-sky-300 rounded p-3">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex mr-12 pr-4 items-center space-x-2">
                  <label htmlFor="start-date" className="text-xs">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    name="start-date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="py-2 px-4 rounded-full border border-gray-300 cursor-pointer"
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
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="py-2 px-4 rounded-full border border-gray-300 cursor-pointer"
                  />
                  <button
                    className="bg-white text-xs p-3 rounded-full font-semibold hover:bg-sky-200"
                    onClick={handleFilterByDate}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center border p-2 px-5 rounded-lg bg-gray-100 shadow-sm">
            <input
              type="text"
              className="flex-grow border-none focus:outline-none px-5 bg-transparent"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IoSearch className="text-gray-500" />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto flex-grow mt-4">
            {filteredUsersList.map((user: any) => (
              <div
                key={user?._id}
                className="flex flex-col border p-4 rounded-lg gap-4 shadow-sm bg-gray-50"
              >
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-4 px-5 py-2 bg-white border rounded-lg shadow-sm flex-grow">
                    <h3 className="text:xs md:text-lg font-semibold">
                      Visited on
                    </h3>
                    <span className="text:xs md:text-lg">
                      {new Date(user?.createdAt).toLocaleDateString()} ---{" "}
                      {new Date(user?.createdAt).toLocaleTimeString()}
                    </span>
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
                    <h3 className="font-semibold text:xs md:text-lg">Name</h3>
                    <span className="text:xs md:text-lg">{user?.username}</span>
                  </div>
                  <button className="flex items-center gap-1 text-white bg-red-500 px-4 py-2 rounded-lg shadow-sm w-24 justify-center">
                    <FaRegTrashAlt />
                    Delete
                  </button>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-4 px-5 py-2 bg-white border rounded-lg shadow-sm flex-grow">
                    <h3 className="font-semibold text:xs md:text-lg">
                      Purpose
                    </h3>
                    <span className="text:xs md:text-lg">
                      {user?.purpose !== "Unknown contact"
                        ? user?.purpose
                        : "Visited by an unknown user"}
                    </span>
                  </div>
                  {user?.propId?.userType !== "Unknown" && (
                    <a
                      className="flex items-center gap-1 text-white text-xs bg-green-500 px-4 py-3 rounded-lg shadow-sm w-24 justify-center"
                      target="_blank"
                      href={`https://wa.me/${user?.phone}`}
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp className="text-white" />
                      Message
                    </a>
                  )}
                </div>

                {user?.propId?.userType !== "Unknown" && (
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-4 px-5 py-2 bg-white border rounded-lg shadow-sm flex-grow">
                      <h3 className="font-semibold text:xs md:text-lg">
                        Phone
                      </h3>
                      <span className="text:xs md:text-lg">{user?.phone}</span>
                    </div>
                    <a
                      href={`tel:${user?.phone}`}
                      className="flex items-center gap-1 text-white bg-sky-500 px-4 py-2 rounded-lg shadow-sm w-24 justify-center"
                    >
                      <IoCallOutline />
                      Call
                    </a>
                  </div>
                )}

                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-4 px-5 py-2 bg-white border rounded-lg shadow-sm flex-grow">
                    <h3 className="font-semibold text:xs md:text-lg">
                      Property
                    </h3>
                    <span className="text:xs md:text-lg">
                      {user?.propId?.propertyName}
                    </span>
                  </div>
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
