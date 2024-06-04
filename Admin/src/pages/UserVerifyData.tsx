import { BsCheckCircleFill } from "react-icons/bs";

const UserVerifyData = () => {
  const handleImageClick = () => {
    document.getElementById("fileInput")?.click();
  };
  return (
    <div className="">
       <div className="absolute z-0 rounded-2xl -top-14 sm:ml-30 md:ml-28 lg:left-64 transform translate-x-1/2 -translate-y-1/2 bg-zinc-300 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>
      <h1 className="relative font-semibold text-2xl z-10 flex justify-center items-center mt-8 text-center md:text-5xl">WE KEEP YOUR DATA SAFE IN OUR HANDS</h1>
      <div className="p-10 z-10">
        <div className="flex flex-col justify-center items-center border-2 relative rounded-md z-10 px-8">
          <div
            className="relative p-2 self-center h-[150px] w-[150px] cursor-pointer mt-8 mb-16"
            onClick={handleImageClick}
          >
            <input
              type="file"
              id="fileInput"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <img
              src="public/userIcon.webp"
              className="w-full h-full object-cover"
              alt="User Icon"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-28 mb-20">

            <div className="">
              <div className="flex justify-between px-2">
                <span className="text-zinc-500 md:text-xl">Address</span>
                <div className="flex justify-between gap-1">
                <BsCheckCircleFill className="text-green-600 text-xs" />
                <span className="text-xs text-green-500 text-center">
                  Valid
                </span>
              </div>
              </div>
              <input
                type="text"
                className="w-[300px] border-2 px-4 py-3 rounded-lg lg:w-[400px]"
                placeholder="Enter your Address"
              />
            </div>

            <div className="">
              <div className="flex justify-between px-2">
                <span className="text-zinc-500 md:text-xl">State</span>
                <div className="flex justify-between gap-1">
                <BsCheckCircleFill className="text-green-600 text-xs" />
                <span className="text-xs text-green-500 text-center">
                  Valid
                </span>
              </div>
              </div>
              <input
                type="text"
                className="w-[300px] border-2 px-4 py-3 rounded-lg lg:w-[400px]"
                placeholder="Enter your State"
              />
            </div>

            <div className="">
              <div className="flex justify-between px-2">
                <span className="text-zinc-500 md:text-xl">City</span>
                <div className="flex justify-between gap-1">
                <BsCheckCircleFill className="text-green-600 text-xs" />
                <span className="text-xs text-green-500 text-center">
                  Valid
                </span>
              </div>
              </div>
              <input
                type="text"
                className="w-[300px] border-2 px-4 py-3 rounded-lg lg:w-[400px]"
                placeholder="Enter your City"
              />
            </div>

            <div className="">
              <div className="flex justify-between px-2">
                <span className="text-zinc-500 md:text-xl">Pincode</span>
                <div className="flex justify-between gap-1">
                <BsCheckCircleFill className="text-green-600 text-xs" />
                <span className="text-xs text-green-500 text-center">
                  Valid
                </span>
              </div>
              </div>
              <input
                type="text"
                className="w-[300px] border-2 px-4 py-3 rounded-lg lg:w-[400px]"
                placeholder="Enter your Pincode"
              />
            </div>

          </div>

        <button className="px-10 py-3 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition duration-300  mb-10">PROCEED</button>
          
        </div>
      </div>
    </div>
  );
};

export default UserVerifyData;
