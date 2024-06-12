import { FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";

const QrCodesSection = () => {
  return (
    <div className="relative p-3">
      <div className="absolute z-0 rounded-2xl -top-56 left-1/2 transform -translate-x-1/2 bg-zinc-300 w-60 h-40 lg:h-96 rotate-45"></div>

      <div className="relative z-10">
        <h1 className="text-start text-xl font-bold mt-14 ml-2 md:text-3xl">
          Your available Qr Codes
        </h1>

        <div className="flex justify-end mb-4">
       <Link to={'/generate_qr'}>
       <button className="bg-sky-500 text-white text-xs px-2 py-1 gap-1 rounded hover:bg-sky-600 lg:text-lg lg:py-2 lg:px-4 lg:gap-2 flex items-center">
            GENERATE NEW CODE
          </button>
       </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full rounded shadow">
            <thead>
              <tr className="flex gap-2 justify-center items-center bg-zinc-300 text-xs font-bold lg:text-lg px-1 py-2 rounded lg:gap-16">
                <th className="flex-1 text-left">QR CODE</th>
                <th className="flex-1 text-left">DOWNLOAD</th>
                <th className="flex-1 text-left">VIDEO CALL</th>
                <th className="flex-1 text-left">PROPERTY NAME</th>
                <th className="flex-1 text-left">PROPERTY ADDRESS</th>
                <th className="flex-1 text-left">DELETE</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {/* Wrap the tbody in a div with overflow-y-auto and max-h-[height] */}
              <div className="overflow-y-auto max-h-[500px]">
                <tr className="flex gap-5 justify-center items-center mt-5 bg-sky-500 text-xs lg:text-lg px-2 py-2 rounded lg:gap-x-28">
                  <td className="flex-1 text-left">
                    <img src="/QR.jpg" alt="QR" className="w-10 h-10 lg:w-16 lg:h-16" />
                  </td>
                  <td className="flex-1 text-left cursor-pointer">
                    <FaDownload className="text-2xl hover:text-sky-800" />
                  </td>
                  <td className="flex-1 text-left text-green-200">ALLOW</td>
                  <td className="flex-1 text-left">HOME</td>
                  <td className="flex-1 text-left">
                    <p>Palluruthy Perumpadappu Kochi-6</p>
                   
                  </td>
                  <td className="flex-1 text-left">
                    <button className="bg-red-500 text-white text-xs cursor-pointer rounded hover:bg-red-700 lg:text-sm lg:py-1 lg:px-2">
                      delete
                    </button>
                  </td>
                </tr>

                <tr className="flex gap-5 justify-center items-center mt-5 bg-sky-500 text-xs lg:text-lg px-2 py-2 rounded lg:gap-x-28">
                  <td className="flex-1 text-left">
                    <img src="/QR.jpg" alt="QR" className="w-10 h-10 lg:w-16 lg:h-16" />
                  </td>
                  <td className="flex-1 text-left cursor-pointer">
                    <FaDownload className="text-2xl hover:text-sky-800" />
                  </td>
                  <td className="flex-1 text-left text-green-200">ALLOW</td>
                  <td className="flex-1 text-left">HOME</td>
                  <td className="flex-1 text-left">
                    <p>Palluruthy Perumpadappu Kochi-6</p>
                   
                  </td>
                  <td className="flex-1 text-left">
                    <button className="bg-red-500 text-white text-xs cursor-pointer rounded hover:bg-red-700 lg:text-sm lg:py-1 lg:px-2">
                      delete
                    </button>
                  </td>
                </tr>

                <tr className="flex gap-5 justify-center items-center mt-5 bg-sky-500 text-xs lg:text-lg px-2 py-2 rounded lg:gap-x-28">
                  <td className="flex-1 text-left">
                    <img src="/QR.jpg" alt="QR" className="w-10 h-10 lg:w-16 lg:h-16" />
                  </td>
                  <td className="flex-1 text-left cursor-pointer">
                    <FaDownload className="text-2xl hover:text-sky-800" />
                  </td>
                  <td className="flex-1 text-left text-green-200">ALLOW</td>
                  <td className="flex-1 text-left">HOME</td>
                  <td className="flex-1 text-left">
                    <p>Palluruthy Perumpadappu Kochi-6</p>
                   
                  </td>
                  <td className="flex-1 text-left">
                    <button className="bg-red-500 text-white text-xs cursor-pointer rounded hover:bg-red-700 lg:text-sm lg:py-1 lg:px-2">
                      delete
                    </button>
                  </td>
                </tr>
              

         
                {/* Add more rows as needed */}
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QrCodesSection;