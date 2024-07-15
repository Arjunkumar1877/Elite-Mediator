import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

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

const SuperAdminRegisteredAdminProfileSection = () => {

  const [adminProfileData, setAdminProfileData]  = useState<AdminDataTypes>()

  return (
    <div className="container mx-auto">
      <div className="absolute z-0 rounded-2xl -top-14 sm:ml-30 md:ml-28 lg:left-20 transform translate-x-1/2 -translate-y-1/2 bg-zinc-300 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>
      <div className="flex flex-col  p-3 ">
        <h1>Profile Info</h1>

        <div className="flex flex-col border-2 rounded relative z-30">
          <div className="flex flex-col md:flex-row justify-between items-center px-28 py-3">
            <div className="flex justify-center">
              <img src="public/userIcon.webp" className="w-32 " alt="" />
            </div>
            <div className="flex justify-end w-15 h-8 md:w-20 m-2">
              <button className="p-1 bg-red-500 w-full rounded text-white hover:bg-red-400 ">
                Block
              </button>
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
                <input
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder="Enter your username"
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
                <input
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder="Enter your username"
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
                <input
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder="Enter your username"
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
                <input
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder="Enter your username"
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
                <input
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder="Enter your username"
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
                <input
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder="Enter your username"
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
                <input
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder="Enter your username"
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
                <input
                  type="text"
                  className="border-2 w-full rounded-md   placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder="Enter your username"
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
                name=""
                id=""
                className="bg-sky-500 text-white rounded-full md:py-1 md:px-5"
              >
                <option value="">Unknown</option>
                <option value="">Unknown</option>
                <option value="">Unknown</option>
              </select>
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
                <tr>
                  <td className="p-2 border-b">#12345</td>
                  <td className="p-2 border-b">John Doe</td>
                  <td className="p-2 border-b">john.doe@example.com</td>
                  <td className="p-2 border-b">Details</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">#12346</td>
                  <td className="p-2 border-b">Jane Smith</td>
                  <td className="p-2 border-b">jane.smith@example.com</td>
                  <td className="p-2 border-b">Details</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminRegisteredAdminProfileSection;
