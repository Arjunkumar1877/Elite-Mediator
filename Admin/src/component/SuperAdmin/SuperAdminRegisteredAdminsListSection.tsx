import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";


const SuperAdminRegisteredAdminsListSection = () => {
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
                <input type="text" className="mx-4 w-full h-full outline-none" placeholder="Search..." />
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
                  <tr className="even:bg-gray-50">
                    <td className="p-2 border-b">#12345</td>
                    <td className="p-2 border-b">John Doe</td>
                    <td className="p-2 border-b">john.doe@example.com</td>
                    <td className="p-2 border-b">123-456-7890</td>
                    <td className="p-2 border-b px-6"><IoIosSend className="text-lg md:text-2xl" /></td>

                  </tr>
                  <tr className="even:bg-gray-50">
                    <td className="p-2 border-b">#12346</td>
                    <td className="p-2 border-b">Jane Smith</td>
                    <td className="p-2 border-b">jane.smith@example.com</td>
                    <td className="p-2 border-b">123-456-7890</td>
                    <td className="p-2 border-b px-6"><IoIosSend className="text-lg md:text-2xl" /></td>
                  </tr>
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
