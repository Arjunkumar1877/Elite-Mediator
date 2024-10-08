import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


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
  scannedCount: number;
};


const PropertyDataSection = () => {
  const { currentAdmin } = useSelector((state: any) => state.admin);
  const [propertyData, setPropertyData] = useState<PropertyDataType[]>([]);

  const fetchPropertyData = async () => {
    try {
      const res = await axios.get(`/api/get_admin_property_data/${currentAdmin._id}`);
      if (res.status === 200) {
        const data: PropertyDataType[] = res.data;
        setPropertyData(data);
      }
    } catch (error) {
      console.error("Error fetching property data", error);
    }
  };

  useEffect(() => {
    fetchPropertyData();
  }, [currentAdmin._id]);

  const handleDeleteProperty = async (id: string) => {
    try {
      const response = await axios.get(`/api/delete_property/${id}`);
      console.log(response.data);
     if(response.data.success){
      fetchPropertyData();

     }
    } catch (error) {
      console.log(error);
    }
  };

  const downloadQRCode = (qrCode: string) => {
    const link = document.createElement('a');
    link.href = qrCode || '';
    link.download = 'qr_code.png';
    link.click();
  };

  const confirmDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProperty(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };



  return (
    <div className="relative p-1">
      <div className="absolute z-0 rounded-2xl -top-56 left-1/2 transform -translate-x-1/2 bg-zinc-300 w-60 h-40 lg:h-96 rotate-45"></div>

      <div className="relative z-10">
        <h1 className="text-start text-xl font-bold mt-14 ml-2 md:text-3xl">
          Your available QR Codes
        </h1>

        <div className="flex justify-end mb-4">
          <Link to="/generate_qr">
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
            <tbody className="text-white flex flex-col">
  {propertyData.length > 0 ? (
    propertyData.map((data: PropertyDataType) => (
      <React.Fragment key={data._id}>
        <tr className="flex gap-5 justify-center items-center mt-5 bg-sky-500 text-xs lg:text-lg px-2 py-2 rounded lg:gap-x-28">
          <td className="flex-1 text-left">
            <img
              src={data.code}
              alt="QR"
              className="w-10 h-10 lg:w-16 lg:h-16"
            />
          </td>
          <td className="flex-1 text-left cursor-pointer">
            <FaDownload onClick={() => downloadQRCode(data.code)} className="text-2xl hover:text-sky-800" />
          </td>
          <td className="flex-1 text-left text-green-200">
            {data.allowVedioCalls ? "ALLOWED" : "NOT ALLOWED"}
          </td>
          <td className="flex-1 text-left">{data.propertyName}</td>
          <td className="flex-1 text-left">
            <p>{data.propertyAddress}</p>
          </td>
          <td className="flex-1 text-left">
            <button
              onClick={() => confirmDelete(data._id)}
              className="bg-red-500 text-white text-xs cursor-pointer rounded hover:bg-red-700 lg:text-sm lg:py-1 lg:px-2"
            >
              delete
            </button>
          </td>
        </tr>

        <tr className="bg-sky-400">
          <td colSpan={6} className="flex justify-between py-1 px-8 font-bold text-slate-600">
            <h2>Scanned count: </h2>
            <h2>{data?.scannedCount}</h2>
          </td>
        </tr>
      </React.Fragment>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="text-center">
        No Property data available
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyDataSection;
