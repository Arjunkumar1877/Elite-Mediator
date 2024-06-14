import React, { useState } from "react";
import toast from "react-hot-toast";
import { TfiSave } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type FormDataType = {
  adminId: string;
  propId: string;
  propertyName: string;
  propertyAddress: string;
  allowVedioCalls: boolean;
  verifyUsers?: boolean;
  url: string;
  code: string;
};

const QrCodeGenerateSection = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate()
  const propId = currentUser._id + Date.now();
  const [QrCode, setQrCode] = useState<string>();
  const protocol = window.location.protocol;
  const host = window.location.host;
  const url = `${protocol}//${host}/new_user?admin=${currentUser._id}&propertyTime=${propId}`;
  
  const [formData, setFormData] = useState<FormDataType>({
    adminId: currentUser._id,
    propId: propId,
    propertyName: "",
    propertyAddress: "",
    allowVedioCalls: false,
    verifyUsers: false,
    url: url,
    code: "",
  });

  const handleGenerateCode = async () => {
    try {
      const res = await fetch(`/api/generate_code/${currentUser._id}/${propId}`);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        toast("Property data saved successfully..");
        navigate('/qrCodes')
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <div className="flex">
              <p className="font-medium">Property Name</p>
            </div>
            <div className="flex py-1">
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
                value={formData?.propertyAddress}
                name="propertyAddress"
                onChange={handleChange}
                required
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
                    <input 
                      type="radio" 
                      name="allowVedioCalls" 
                      id="videoYes" 
                      className="mr-2" 
                      value="true"
                      checked={formData.allowVedioCalls === true}
                      onChange={() => setFormData({ ...formData, allowVedioCalls: true })}
                    />
                    <label htmlFor="videoYes">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="allowVedioCalls" 
                      id="videoNo" 
                      className="mr-2" 
                      value="false"
                      checked={formData.allowVedioCalls === false}
                      onChange={() => setFormData({ ...formData, allowVedioCalls: false })}
                    />
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
                    <input 
                      type="radio" 
                      name="verifyUsers" 
                      id="verifiedYes" 
                      className="mr-2" 
                      value="true"
                      checked={formData.verifyUsers === true}
                      onChange={() => setFormData({ ...formData, verifyUsers: true })}
                    />
                    <label htmlFor="verifiedYes">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="verifyUsers" 
                      id="verifiedNo" 
                      className="mr-2" 
                      value="false"
                      checked={formData.verifyUsers === false}
                      onChange={() => setFormData({ ...formData, verifyUsers: false })}
                    />
                    <label htmlFor="verifiedNo">No</label>
                  </div>
                </div>
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
              <div className="flex justify-center">
                <button type="button" onClick={handleGenerateCode} className="bg-sky-500 text-white text-xs px-2 py-1 gap-1 rounded-lg hover:bg-sky-600 lg:text-lg lg:py-2 lg:px-4 lg:gap-2 flex items-center">
                  GENERATE QR CODE
                </button>
              </div>

              <div className="flex gap-4 lg:gap-8">
                <button type="button" className="bg-sky-500 text-white text-xs px-2 py-1 gap-1 rounded-lg hover:bg-sky-600 lg:text-lg lg:py-2 lg:px-8 lg:gap-2 flex items-center">
                  CANCEL
                </button>
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
