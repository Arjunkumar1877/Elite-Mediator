import { MdOutlineMail } from "react-icons/md";
import { IoSettingsOutline } from 'react-icons/io5';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaRegUser } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { Link } from "react-router-dom";





const ProfileSection = () => {
  return (
    <div className="w-full h-screen flex flex-col relative z-10">
      <div className="p-6 bg-white shadow-sm">
        <h1 className="text-xl">Account Information</h1>
      </div>

      <div className="flex-1 flex flex-col items-center p-6 overflow-y-auto bg-gray-100 relative z-20">
      <div className="absolute z-0 rounded-2xl -top-14 sm:ml-30 md:ml-28 lg:left-64 transform translate-x-1/2 -translate-y-1/2 bg-zinc-300 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>

      <div className="absolute z-0 rounded-2xl  sm:ml-30 md:ml-28 lg:-right-10 lg:top-96 transform translate-x-1/2 -translate-y-1/2 bg-sky-500 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>


        <div className="flex flex-col justify-center relative z-20 items-center w-full bg-white rounded-md shadow-md p-6 md:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row justify-between items-center w-full mb-10 px-10">
            <div className="mb-6 md:mb-0">
              <img
                src="public/userIcon.webp"
                alt="User Icon"
                className="h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 rounded-full object-cover"
              />
            </div>
          
          <Link to={'/editprofile'}>
          <div className="flex flex-col md:flex-row text-zinc-400 items-center md:items-end justify-end w-full text-center md:text-right cursor-pointer hover:text-zinc-800">
            <span className="uppercase text-lg md:text-xl lg:text-2xl font-semibold">Edit</span>
              <span className="flex text-center justify-center items-center text-2xl mt-2 md:mt-0 md:ml-2">
                <IoSettingsOutline className='self-center' />
              </span>
            </div>
          </Link>

          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 w-full">
           
              <div  className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-gray-500 text-lg md:text-xl">Name</span>
                  <div className="flex items-center gap-2">
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                    <span className="text-xs text-green-500">Valid</span>
                  </div>
                </div>
                <div className="flex relative">
                  <FaRegUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                  <input
                    type="text"
                    className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                    placeholder="Arjun Kumar VS"
                    disabled
                  />
                </div>
              </div>

              <div  className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-gray-500 text-lg md:text-xl">Email</span>
                  <div className="flex items-center gap-2">
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                    <span className="text-xs text-green-500">Valid</span>
                  </div>
                </div>
                <div className="flex relative">
                  <MdOutlineMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                  <input
                    type="text"
                    className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                    placeholder="arjun@gmail.com"
                    disabled
                  />
                </div>
              </div>


              <div  className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-gray-500 text-lg md:text-xl">Address</span>
                  <div className="flex items-center gap-2">
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                    <span className="text-xs text-green-500">Valid</span>
                  </div>
                </div>
                <div className="flex relative">
                  <FaRegAddressCard className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                  <input
                    type="text"
                    className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                    placeholder="Velliyathar house palluruthy"
                    disabled
                  />
                </div>
              </div>


              <div  className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-gray-500 text-lg md:text-xl">Phone</span>
                  <div className="flex items-center gap-2">
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                    <span className="text-xs text-green-500">Valid</span>
                  </div>
                </div>
                <div className="flex relative">
                  <FiPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                  <input
                    type="text"
                    className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                    placeholder="Velliyathar house palluruthy"
                    disabled
                  />
                </div>
              </div>


             <div  className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-gray-500 text-lg md:text-xl">State</span>
                  <div className="flex items-center gap-2">
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                    <span className="text-xs text-green-500">Valid</span>
                  </div>
                </div>
                <div className="flex relative">
                  <MdOutlineEditLocationAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                  <input
                    type="text"
                    className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                    placeholder="Kerela"
                    disabled
                  />
                </div>
              </div>




              <div  className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-gray-500 text-lg md:text-xl">City</span>
                  <div className="flex items-center gap-2">
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                    <span className="text-xs text-green-500">Valid</span>
                  </div>
                </div>
                <div className="flex relative">
                  <MdMyLocation className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                  <input
                    type="text"
                    className="border-2 w-full rounded-md placeholder:text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                    placeholder="Ernakulam"
                    disabled
                  />
                </div>
              </div>


              
         
              
 


              
             

        
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;