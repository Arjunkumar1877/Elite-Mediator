import React, { useState } from "react";
import toast from "react-hot-toast";
import { TfiSave } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";


type FormDataType = {
  adminId: string;
  propId: string;
  propertyName: string;
  propertyAddress: string;
  allowVedioCalls: boolean;
  userType?: "Verified" | "Unverified" | "Unknown";
  url: string;
  code: string;
};

const QrCodeGenerateSection = () => {
  const { currentAdmin } = useSelector((state: any) => state.admin);
  const [showUserTypeDetails, setShowUserTypeDetails] = useState<boolean>(false)
  // const [propIdS, setPorpIdS] = useState<string>();
  const navigate = useNavigate();
  const propId = currentAdmin._id + Date.now();
  const [QrCode, setQrCode] = useState<string>();
  const protocol = window.location.protocol;
  const host = window.location.host;
  const url = `${protocol}//${host}/new_user?adminId=${currentAdmin._id}&propId=${propId}`;

  const [formData, setFormData] = useState<FormDataType>({
    adminId: currentAdmin._id,
    propId: '',
    propertyName: "",
    propertyAddress: "",
    allowVedioCalls: false,
    userType: 'Verified',
    url: '',
    code: "",
  });

  const handleGenerateCode = async () => {
    try {
      setFormData({ ...formData, url: url, propId: propId });
      const res = await fetch(`/api/generate_code/${currentAdmin._id}/${propId}`);

      if (res.ok) {
        const data = await res.json();
        setQrCode(data.qrCodeUrl); 
        setFormData((prev) => ({
          ...prev,
          code: data.qrCodeUrl,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type, checked }: any = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(formData.allowVedioCalls === false || formData.code === '' || formData?.propertyAddress === "" || formData.propertyName === "" || formData.url === ""){
      return toast("Give the necessary details and generate a code before saving")
    }
    try {
      const res = await fetch('/api/save_property_data', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        console.log("Data saved successfully");
        downloadQRCode();
        toast.success("Property data saved successfully.");
        navigate('/qrCodes');
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formData)

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = QrCode || '';
    link.download = 'qr_code.png';
    link.click();
  };
  
  return (
    <div className="flex flex-col p-5 bg-gray-50 min-h-screen">
      <div className="flex mt-10 ml-5">
        <h1 className="text-lg font-bold lg:text-3xl">Generate New Code</h1>
      </div>

      <div className="flex flex-col border-2 rounded p-5 bg-white shadow-lg mt-5">
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col px-7 pt-10">
            <label className="font-medium">Property Name</label>
            <input
              type="text"
              className="w-full border-2 py-2 px-4 rounded-lg lg:py-3 lg:px-5 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your property name"
              name="propertyName"
              value={formData?.propertyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col px-7 pt-5">
            <label className="font-medium">Property Address</label>
            <input
              type="text"
              className="w-full border-2 py-2 px-4 rounded-lg lg:py-3 lg:px-5 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your property address"
              name="propertyAddress"
              value={formData?.propertyAddress}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="flex justify-between px-7 pt-5 gap-4 flex-col lg:flex-row">
            <div className="flex flex-col w-full lg:w-1/2">
          {
            showUserTypeDetails &&   <div className="flex flex-col shadow-2xl p-2 rounded-md">
              <div className="flex justify-end p-2 hover:text-xl cursor-pointer ">
                <span className=" flex justify-center items-center hover:bg-sky-400 rounded-full px-2">
                x
                </span>
              </div>
              <p><span>Verified:-</span> The user scanning the code can only contact you after verifiying them using and otp</p>
              <p><span>Unverified:-</span> The user scanning the code can contact you after endering there phone, purpose and name without verification</p>
              <p><span>Unknown:-</span> The user scanning the code can directly contact you</p>
            </div>
          }
              <span className="flex gap-2  items-center"><label className="font-medium">User Type</label> <FaCircleExclamation  onClick={()=> {
               setShowUserTypeDetails(!showUserTypeDetails)
              }} className="text-slate-500 cursor-pointer hover:text-slate-800" />
               
              </span>
              <select 
                name="userType" 
                value={formData.userType}
                onChange={handleChange} 
                className="border-2 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="Verified">Verified</option>
                <option value="Unverified">Unverified</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div className="flex flex-col w-full lg:w-1/2">
              <label className="font-medium">Allow Video Calls</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="allowVedioCalls" 
                    value="true"
                    checked={formData.allowVedioCalls === true}
                    onChange={() => setFormData({ ...formData, allowVedioCalls: true })}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="allowVedioCalls" 
                    value="false"
                    checked={formData.allowVedioCalls === false}
                    onChange={() => setFormData({ ...formData, allowVedioCalls: false })}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
          </div> */}

<div className="flex justify-between px-7 pt-5 gap-8 flex-col lg:flex-row">
  <div className="flex flex-col w-full lg:w-1/2 space-y-4">
    <div className="flex items-center gap-2">
      <label className="font-semibold text-lg">User Type</label>
      <FaCircleExclamation 
        onClick={() => setShowUserTypeDetails(!showUserTypeDetails)} 
        className="text-slate-500 cursor-pointer hover:text-slate-800 transition-colors duration-300" 
      />
    </div>
    {showUserTypeDetails && (
      <div className="flex flex-col bg-zinc-500 text-white  shadow-2xl p-4 rounded-lg border border-slate-200 space-y-2">
        <div className="flex justify-end">
          <span 
            onClick={() => setShowUserTypeDetails(false)}
            className="flex justify-center items-center hover:bg-red-400 bg-red-500 opacity-100 text-white rounded-full w-5 h-5 cursor-pointer transition-colors duration-300"
          >
            ×
          </span>
        </div>
        <p className="text-sm"><span className="font-bold text-lg">Verified:</span> The user scanning the code can only contact you after verifying themselves using an OTP.</p>
        <p className="text-sm"><span className="font-bold text-lg">Unverified:</span> The user scanning the code can contact you after entering their phone, purpose, and name without verification.</p>
        <p className="text-sm"><span className="font-bold text-lg">Unknown:</span> The user scanning the code can directly contact you.</p>
      </div>
    )}
    <select 
      name="userType" 
      value={formData.userType}
      onChange={handleChange} 
      className="border-2 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
    >
      <option value="Verified">Verified</option>
      <option value="Unverified">Unverified</option>
      <option value="Unknown">Unknown</option>
    </select>
  </div>

  <div className="flex flex-col w-full lg:w-1/2 space-y-4">
    <label className="font-semibold text-lg">Allow Video Calls</label>
    <div className="flex gap-4">
      <label className="flex items-center">
        <input 
          type="radio" 
          name="allowVedioCalls" 
          value="true"
          checked={formData.allowVedioCalls === true}
          onChange={() => setFormData({ ...formData, allowVedioCalls: true })}
          className="mr-2 accent-sky-500"
        />
        Yes
      </label>
      <label className="flex items-center">
        <input 
          type="radio" 
          name="allowVedioCalls" 
          value="false"
          checked={formData.allowVedioCalls === false}
          onChange={() => setFormData({ ...formData, allowVedioCalls: false })}
          className="mr-2 accent-sky-500"
        />
        No
      </label>
    </div>
  </div>
</div>


          <div className="flex flex-col lg:flex-row justify-evenly items-center px-7 py-7 gap-4">
            <div className="relative p-3 border-2 rounded-lg">
              {QrCode && <img src={QrCode} alt="QR Code" className="w-36 h-36" />}
              <label htmlFor="fileInput" className="absolute inset-0 bg-gray-200 opacity-0 hover:opacity-50 cursor-pointer flex items-center justify-center text-gray-700">
                Upload QR
              </label>
            </div>

            <div className="flex flex-col gap-8 mt-10 lg:mt-0">
              <button type="button" onClick={handleGenerateCode} className="bg-sky-500 text-white text-xs px-2 py-1 gap-1 rounded-lg hover:bg-sky-600 lg:text-lg lg:py-2 lg:px-4 lg:gap-2 flex items-center">
                GENERATE QR CODE
              </button>

              <div className="flex gap-4 lg:gap-8">
                <Link to={"/qrCodes"} type="button" className="bg-sky-500 text-white text-xs px-2 py-1 gap-1 rounded-lg hover:bg-sky-600 lg:text-lg lg:py-2 lg:px-8 lg:gap-2 flex items-center">
                  CANCEL
                </Link>
                <button type="submit" className="bg-sky-500 text-white text-xs px-2 py-1 gap-1 rounded-lg hover:bg-sky-600 lg:text-lg lg:py-2 lg:px-8 lg:gap-2 flex items-center">
                  SAVE & DOWNLOAD <TfiSave className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QrCodeGenerateSection;
