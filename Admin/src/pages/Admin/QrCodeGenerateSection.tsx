import { TfiSave } from "react-icons/tfi";

const QrCodeGenerateSection = () => {
  return (
    <div className="flex flex-col p-5 bg-gray-50 min-h-screen">
      <div className="flex mt-10 ml-5">
        <h1 className="text-lg font-bold lg:text-3xl">Generate New Code</h1>
      </div>

      <div className="flex flex-col border-2 rounded p-5 bg-white shadow-lg mt-5">
        <div className="flex flex-col px-7 pt-10">
          <div className="flex">
            <p className="font-medium">Property Name</p>
          </div>
          <div className="flex py-1">
            <input
              type="text"
              className="w-full border-2 py-2 px-4 rounded-lg lg:py-3 lg:px-5 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your property name"
            />
          </div>
        </div>

        <div className="flex flex-col px-7 pt-5">
          <div className="flex">
            <p className="font-medium">Property Address</p>
          </div>
          <div className="flex py-1">
            <input
              type="text"
              className="w-full border-2 py-2 px-4 rounded-lg lg:py-3 lg:px-5 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your property address"
            />
          </div>
        </div>

        <div className="flex flex-col px-7 pt-5">
          <div className="flex py-1 w-full gap-4 flex-col lg:flex-row">
            <div className="flex flex-col w-full lg:w-1/2">
              <div className="flex">
                <p className="font-medium">Allow Video Calls</p>
              </div>
              <div className="border-2 flex rounded-lg justify-around py-4 gap-10">
                <div className="flex items-center">
                  <input type="radio" name="videoCalls" id="videoYes" className="mr-2" />
                  <label htmlFor="videoYes">Yes</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="videoCalls" id="videoNo" className="mr-2" />
                  <label htmlFor="videoNo">No</label>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full lg:w-1/2">
              <div className="flex">
                <p className="font-medium">Allow Only Verified Users?</p>
              </div>
              <div className="border-2 flex rounded-lg justify-around py-4 gap-10">
                <div className="flex items-center">
                  <input type="radio" name="verifiedUsers" id="verifiedYes" className="mr-2" />
                  <label htmlFor="verifiedYes">Yes</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="verifiedUsers" id="verifiedNo" className="mr-2" />
                  <label htmlFor="verifiedNo">No</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-evenly items-center px-7 py-7 gap-4">
          <div className="relative p-3 border-2 rounded-lg">
            <img src="/QR.jpg" alt="QR Code" className="w-36 h-36" />
            <label htmlFor="fileInput" className="absolute inset-0 bg-gray-200 opacity-0 hover:opacity-50 cursor-pointer flex items-center justify-center text-gray-700">
              Upload QR
            </label>
            <input type="file" id="fileInput" className="hidden" />
          </div>

          <div className="flex flex-col gap-8 mt-10 lg:mt-0">
            <div className="flex justify-center">
              <button className="bg-sky-500 text-white text-xs px-2 py-1 gap-1 rounded-lg hover:bg-sky-600 lg:text-lg lg:py-2 lg:px-4 lg:gap-2 flex items-center">
                GENERATE QR CODE
              </button>
            </div>

            <div className="flex gap-4 lg:gap-8">
              <button className="bg-sky-500 text-white text-xs px-2 py-1 gap-1 rounded-lg hover:bg-sky-600 lg:text-lg lg:py-2 lg:px-8 lg:gap-2 flex items-center">
                CANCEL
              </button>
              <button className="bg-sky-500 text-white text-xs px-2 py-1 gap-1 rounded-lg hover:bg-sky-600 lg:text-lg lg:py-2 lg:px-8 lg:gap-2 flex items-center">
                SAVE <TfiSave className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCodeGenerateSection;
