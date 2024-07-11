import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

type PropertyDataType = {
  _id: string;
  adminId: string;
  propId: string;
  propertyName: string;
  propertyAddress: string;
  allowVedioCalls: boolean;
  verifyUsers: boolean;
  url: string;
  code: string;
};
const PropertyDataSection = () => {
  const { currentAdmin } = useSelector((state: any) => state.admin);
  const [propertyData, setPropertyData] = useState<PropertyDataType[]>([]);
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const res = await axios.get(
          `/api/get_admin_property_data/${currentAdmin._id}`
        );
        if (res.status === 200) {
          const data: PropertyDataType[] = res.data;
          setPropertyData(data);
        }
      } catch (error) {
        console.error("Error fetching property data", error);
      }
    };

    fetchPropertyData();
  }, []);

  console.log(propertyData);
  const downloadQRCode = (qrCode: string) => {
    const link = document.createElement('a');
    link.href = qrCode || '';
    link.download = 'qr_code.png';
    link.click();
  };

  // const handleDelete = async (id: string) => {
  //   try {
  //     const res = await axios.get(`/api/delete_admin_property_data/${id}`);

  //     const data:any = res.data;
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  return (
    <div className="relative p-1">
      <div className="absolute z-0 rounded-2xl -top-56 left-1/2 transform -translate-x-1/2 bg-zinc-300 w-60 h-40 lg:h-96 rotate-45"></div>

      <div className="relative z-10">
        <h1 className="text-start text-xl font-bold mt-14 ml-2 md:text-3xl">
          Your available Qr Codes
        </h1>

        <div className="flex justify-end mb-4">
          <Link to={"/generate_qr"}>
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
              <div className="overflow-y-auto max-h-[500px]">
                {propertyData.length > 0 ? (
                  propertyData.map((data: PropertyDataType) => (
                    <tr className="flex gap-5 justify-center items-center mt-5 bg-sky-500 text-xs lg:text-lg px-2 py-2 rounded lg:gap-x-28">
                      <td className="flex-1 text-left">
                        <img
                          src={data?.code}
                          alt="QR"
                          className="w-10 h-10 lg:w-16 lg:h-16"
                        />
                      </td>
                      <td className="flex-1 text-left cursor-pointer">
                        <FaDownload onClick={()=> downloadQRCode(data?.code)} className="text-2xl hover:text-sky-800" />
                      </td>
                      <td className="flex-1 text-left text-green-200">
                        {data?.allowVedioCalls ? "ALLOWED" : "NOT ALLOWED"}
                      </td>
                      <td className="flex-1 text-left">{data?.propertyName}</td>
                      <td className="flex-1 text-left">
                        <p>{data?.propertyAddress}</p>
                      </td>
                      <td className="flex-1 text-left">
                        <button
                          // onClick={() => handleDelete(data?._id)}
                          className="bg-red-500 text-white text-xs cursor-pointer rounded hover:bg-red-700 lg:text-sm lg:py-1 lg:px-2"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <h1>No Property data available</h1>
                )}
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyDataSection;
