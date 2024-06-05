import React, { useState } from "react";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import { FaRegUser, FaRegAddressCard } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail, MdOutlineEditLocationAlt, MdMyLocation } from "react-icons/md";

interface ProfileData {
  name: string;
  email: string;
  address: string;
  phone: string;
  state: string;
  city: string;
}

const EditProfileSection: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    address: "",
    phone: "",
    state: "",
    city: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  }
};

  const [validity, setValidity] = useState<Record<keyof ProfileData, boolean>>({
    name: false,
    email: false,
    address: false,
    phone: false,
    state: false,
    city: false,
  });

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateName = (name: string): boolean => {
    return name.trim() !== "";
  };

  const validateAddress = (address: string): boolean => {
    return address.trim() !== "";
  };

  const validatePhone = (phone: string): boolean => {
    return /^[0-9]{10}$/.test(phone);
  };

  const validateCity = (city: string): boolean => {
    return city.trim() !== "";
  };

  const validateState = (state: string): boolean => {
    return state.trim() !== "";
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ProfileData) => {
    const value = e.target.value;
    setProfileData({ ...profileData, [field]: value });

    // Validate the field
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "name":
        isValid = validateName(value);
        break;
      case "address":
        isValid = validateAddress(value);
        break;
      case "phone":
        isValid = validatePhone(value);
        break;
      case "state":
        isValid = validateState(value);
        break;
      case "city":
        isValid = validateCity(value);
        break;
      default:
        isValid = value.trim() !== "";
    }
    setValidity({ ...validity, [field]: isValid });
  };

  const handleSave = () => {
    // Logic to save profile data
    console.log("Profile data saved:", profileData);
  };

  return (
    <div className="w-full h-screen flex flex-col relative z-10">
      <div className="p-6 bg-white shadow-sm">
        <h1 className="text-xl">Edit Profile</h1>
      </div>

      <div className="flex-1 flex flex-col items-center p-6 overflow-y-auto bg-gray-100 relative z-20">
        <div className="flex flex-col justify-center items-center w-full bg-white rounded-md shadow-md p-6 md:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row justify-between items-center w-full mb-10 px-10">
            <div className="mb-6 md:mb-0">
              <label htmlFor="profile-image" className="cursor-pointer">
                <img
                  src={profileImage || "public/userIcon.webp"}
                  alt="User Icon"
                  className="h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 rounded-full object-cover"
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id="profile-image"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 w-full">
            <div className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-gray-500 text-lg md:text-xl">Name</span>
                <div className="flex items-center gap-2">
                  {validity.name ? (
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                  ) : (
                    <BsExclamationCircleFill className="text-red-600 text-sm" />
                  )}
                  <span className={`text-xs  ${validity.name ? 'text-green-500' : "text-red-600"}`}>
                    {validity.name ? "Valid" : "Required"}
                  </span>
                </div>
              </div>
              <div className="flex relative">
                <FaRegUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input
                  type="text"
                  className="border-2 w-full rounded-md placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder="Enter your name"
                  value={profileData.name}
                  onChange={(e) => handleChange(e, "name")}
                />
              </div>
            </div>

            <div className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-gray-500 text-lg md:text-xl">Email</span>
                <div className="flex items-center gap-2">
                  {validity.email ? (
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                  ) : (
                    <BsExclamationCircleFill className="text-red-600 text-sm" />
                  )}
                  <span className={`text-xs  ${validity.email ? 'text-green-500' : "text-red-600"}`}>
                    {validity.email ? "Valid" : "Invalid"}
                  </span>
                </div>
              </div>
              <div className="flex relative">
                <MdOutlineMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input
                  type="text"
                  className="border-2 w-full rounded-md  placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder="Enter your email"
                  value={profileData.email}
                  onChange={(e) => handleChange(e, "email")}
                />
              </div>
            </div>

            <div className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-gray-500 text-lg md:text-xl">Address</span>
                <div className="flex items-center gap-2">
                  {validity.address ? (
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                  ) : (
                    <BsExclamationCircleFill className="text-red-600 text-sm" />
                  )}
                  <span className={`text-xs  ${validity.address ? 'text-green-500' : "text-red-600"}`}>
                    {validity.address ? "Valid" : "Required"}
                  </span>
                </div>
              </div>
              <div className="flex relative">
                <FaRegAddressCard className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input
                  type="text"
                  className="border-2 w-full rounded-md  placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder="Enter your address"
                  value={profileData.address}
                  onChange={(e) => handleChange(e, "address")}
                />
              </div>
            </div>


              <div  className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-gray-500 text-lg md:text-xl">Phone</span>
                  <div className="flex items-center gap-2">
                  {validity.phone ? (
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                  ) : (
                    <BsExclamationCircleFill className="text-red-600 text-sm" />
                  )}
                  <span className={`text-xs  ${validity.phone ? 'text-green-500' : "text-red-600"}`}>
                    {validity.phone ? "Valid" : "Invalid"}
                  </span>
                </div>
                </div>
                <div className="flex relative">
                  <FiPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                  <input
                    type="text"
                    className="border-2 w-full rounded-md  placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                    placeholder="Enter your address"
                    value={profileData.phone}
                    onChange={(e) => handleChange(e, "phone")}
                  />
                </div>
              </div>


             <div  className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-gray-500 text-lg md:text-xl">State</span>
                  <div className="flex items-center gap-2">
                  {validity.state ? (
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                  ) : (
                    <BsExclamationCircleFill className="text-red-600 text-sm" />
                  )}
                  <span className={`text-xs  ${validity.state ? 'text-green-500' : "text-red-600"}`}>
                    {validity.state ? "Valid" : "Required"}
                  </span>
                </div>
                </div>
                <div className="flex relative">
                  <MdOutlineEditLocationAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                  <input
                    type="text"
                    className="border-2 w-full rounded-md  placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                    placeholder="Enter you state"
                    value={profileData.state}
                    onChange={(e) => handleChange(e, "state")}
                  />
                </div>
              </div>




              <div  className="flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10  rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-gray-500 text-lg md:text-xl">City</span>
                  <div className="flex items-center gap-2">
                  {validity.city ? (
                    <BsCheckCircleFill className="text-green-600 text-sm" />
                  ) : (
                    <BsExclamationCircleFill className="text-red-600 text-sm" />
                  )}
                  <span className={`text-xs  ${validity.city ? 'text-green-500' : "text-red-600"}`}>
                    {validity.city ? "Valid" : "Required"}
                  </span>
                </div>
                </div>
                <div className="flex relative">
                  <MdMyLocation className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                  <input
                    type="text"
                    className="border-2 w-full rounded-md  placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                    placeholder="Enter you city"
                    value={profileData.city}
                  onChange={(e) => handleChange(e, "city")}
                  />
                </div>
              </div>


          </div>
          {/* Add save button */}
          <div className="flex justify-end mt-6">
            <button
              className="bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition-colors"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileSection;
