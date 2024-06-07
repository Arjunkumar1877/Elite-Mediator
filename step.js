import React, { useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import {
  BsCheckCircleFill,
  BsExclamationCircleFill
} from "react-icons/bs";
import {
  FaRegUser,
  FaRegAddressCard
} from "react-icons/fa";
import {
  FiPhone
} from "react-icons/fi";
import {
  MdOutlineMail,
  MdOutlineEditLocationAlt,
  MdMyLocation
} from "react-icons/md";
import {
  useSelector
} from "react-redux";
import {
  useNavigate
} from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import app from "../firebase/firebase";
import toast from "react-hot-toast";

interface ProfileData {
  name: string;
  email: string;
  address: string;
  phone: string;
  state: string;
  city: string;
  image: string;
}

const EditProfileSection: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    address: "",
    phone: "",
    state: "",
    city: "",
    image: ""
  });
  let isValid = false;
  const [file, setFile] = useState < File | null > (null);
  const [imageUploadProgress, setImageUploadProgress] = useState < number | null > (null);
  const [imageUploadError, setImageUploadError] = useState < string | null > (null);

  const [profileImage, setProfileImage] = useState < string | null > (null);
  const {
    currentUser
  } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent < HTMLInputElement > ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) {
      setImageUploadError("Please select an image");
      return;
    }

    try {
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "_" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress);
        },
        (error) => {
          setImageUploadError("Image upload failed: " + error.message);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setProfileData((prevData) => ({
              ...prevData,
              image: downloadURL
            }));
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/get_admin/${currentUser._id}`);

      if (res.ok) {
        const data = await res.json();
        setProfileData({
          name: data.username,
          email: data.email,
          address: data.address,
          phone: data.phone,
          state: data.state,
          city: data.city,
          image: data.image
        });
      } else {
        console.log("Error fetching admin data");
      }
    };
    fetchUser();
  }, [currentUser._id]);

  const [validity, setValidity] = useState < Record < keyof ProfileData, boolean >> ({
    name: true,
    email: true,
    address: true,
    phone: true,
    state: true,
    city: true,
    image: true
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

  const handleChange = (e: React.ChangeEvent < HTMLInputElement > , field: keyof ProfileData) => {
    const value = e.target.value;
    setProfileData({
      ...profileData,
      [field]: value
    });

    // Validate the field
    
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
    setValidity({
      ...validity,
      [field]: isValid
    });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/update_admin/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();
      if (res.ok && data.updated) {
        navigate("/profile");
        toast("Profile updated sucessfully")
      } else {
        console.log("error updating the profile");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return ( 
    <div className = "w-full h-screen flex flex-col relative z-10" >
      <div className = "p-6 bg-white shadow-sm" >
        <h1 className = "text-xl" > Edit Profile </h1> 
      </div>

      <div className = "flex-1 flex flex-col items-center p-6 overflow-y-auto bg-gray-100 relative z-20" >
        <div className = "flex flex-col justify-center items-center w-full bg-white rounded-md shadow-md p-6 md:p-8 lg:p-10" >
          <div className = "flex flex-col md:flex-row justify-between items-center w-full mb-10 px-10" >
            <div className = "mb-6 md:mb-0" >
              <label htmlFor = "profile-image" className = "cursor-pointer" >
       

{imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={profileData.image || file}
            alt='user'
            className={`h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 rounded-full object-cover ${
              imageUploadProgress &&
              imageUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
            
              </label> 
              <input type = "file"
                accept = "image/*"
                id = "profile-image"
                className = "hidden"
                onChange = {
                  handleImageChange
                }
              /> 
            </div> 
          </div> 
          <div className = "grid grid-cols-1 gap-6 xl:grid-cols-2 w-full" >
            <div className = "flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10 rounded-md shadow-sm" >
              <div className = "flex justify-between items-center mb-4 px-2" >
                <span className = "text-gray-500 text-lg md:text-xl" > Name </span> 
                <div className = "flex items-center gap-2" >
                  {
                    validity.name ? ( 
                      <BsCheckCircleFill className = "text-green-600 text-sm" />
                    ) : ( 
                      <BsExclamationCircleFill className = "text-red-600 text-sm" />
                    )
                  } 
                  <span className = {
                    `text-xs ${validity.name ? 'text-green-500' : "text-red-600"}`
                  } > {
                    validity.name ? "Valid" : "Required"
                  } 
                  </span> 
                </div> 
              </div> 
              <div className = "flex relative" >
                <FaRegUser className = "absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input type = "text"
                  className = "border-2 w-full rounded-md placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder = "Enter your name"
                  value = {
                    profileData.name
                  }
                  onChange = {
                    (e) => handleChange(e, "name")
                  }
                /> 
              </div> 
            </div> 
            <div className = "flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10 rounded-md shadow-sm" >
              <div className = "flex justify-between items-center mb-4 px-2" >
                <span className = "text-gray-500 text-lg md:text-xl" > Email </span> 
                <div className = "flex items-center gap-2" >
                  {
                    validity?.email && profileData.email.length > 0 ? ( 
                      <BsCheckCircleFill className = "text-green-600 text-sm" />
                    ) : ( 
                      <BsExclamationCircleFill className = "text-red-600 text-sm" />
                    )
                  } 
                  <span className = {
                    `text-xs ${validity?.email && profileData.email.length > 0 ? 'text-green-500' : "text-red-600"}`
                  } > {
                    validity?.email && profileData.email.length > 0 ? "Valid" : "Required"
                  } 
                  </span> 
                </div> 
              </div> 
              <div className = "flex relative" >
                <MdOutlineMail className = "absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input type = "email"
                  className = "border-2 w-full rounded-md placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder = "Enter your email"
                  value = {
                    profileData.email
                  }
                  onChange = {
                    (e) => handleChange(e, "email")
                  }
                /> 
              </div> 
            </div> 
            <div className = "flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10 rounded-md shadow-sm" >
              <div className = "flex justify-between items-center mb-4 px-2" >
                <span className = "text-gray-500 text-lg md:text-xl" > Address </span> 
                <div className = "flex items-center gap-2" >
                  {
                    validity?.address && profileData?.address?.length ? ( 
                      <BsCheckCircleFill className = "text-green-600 text-sm" />
                    ) : ( 
                      <BsExclamationCircleFill className = "text-red-600 text-sm" />
                    )
                  } 
                  <span className = {
                    `text-xs ${validity?.address && profileData?.address?.length  ? 'text-green-500' : "text-red-600"}`
                  } > {
                    validity?.address && profileData?.address?.length ? "Valid" : "Required"
                  } 
                  </span> 
                </div> 
              </div> 
              <div className = "flex relative" >
                <MdOutlineEditLocationAlt className = "absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input type = "text"
                  className = "border-2 w-full rounded-md placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder = "Enter your address"
                  value = {
                    profileData.address
                  }
                  onChange = {
                    (e) => handleChange(e, "address")
                  }
                /> 
              </div> 
            </div> 
            <div className = "flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10 rounded-md shadow-sm" >
              <div className = "flex justify-between items-center mb-4 px-2" >
                <span className = "text-gray-500 text-lg md:text-xl" > Phone </span> 
                <div className = "flex items-center gap-2" >
                  {
                    validity.phone && profileData?.phone?.length > 0 ? ( 
                      <BsCheckCircleFill className = "text-green-600 text-sm" />
                    ) : ( 
                      <BsExclamationCircleFill className = "text-red-600 text-sm" />
                    )
                  } 
                  <span className = {
                    `text-xs ${validity.phone && profileData?.phone?.length > 0 ? 'text-green-500' : "text-red-600"}`
                  } > {
                    validity.phone && profileData?.phone?.length ? "Valid" : "Required"
                  } 
                  </span> 
                </div> 
              </div> 
              <div className = "flex relative" >
                <FiPhone className = "absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" / >
                <input type = "tel"
                  className = "border-2 w-full rounded-md placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder = "Enter your phone number"
                  value = {
                    profileData.phone
                  }
                  onChange = {
                    (e) => handleChange(e, "phone")
                  }
                /> 
              </div> 
            </div> 
            <div className = "flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10 rounded-md shadow-sm" >
              <div className = "flex justify-between items-center mb-4 px-2" >
                <span className = "text-gray-500 text-lg md:text-xl" > State </span> 
                <div className = "flex items-center gap-2" >
                  {
                    validity.state ? ( 
                      <BsCheckCircleFill className = "text-green-600 text-sm" />
                    ) : ( 
                      <BsExclamationCircleFill className = "text-red-600 text-sm" />
                    )
                  } 
                  <span className = {
                    `text-xs ${validity.state ? 'text-green-500' : "text-red-600"}`
                  } > {
                    validity.state ? "Valid" : "Required"
                  } 
                  </span> 
                </div> 
              </div> 
              <div className = "flex relative" >
                <MdMyLocation className = "absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input type = "text"
                  className = "border-2 w-full rounded-md placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder = "Enter your state"
                  value = {
                    profileData.state
                  }
                  onChange = {
                    (e) => handleChange(e, "state")
                  }
                /> 
              </div> 
            </div> 
            <div className = "flex flex-col w-full px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10 rounded-md shadow-sm" >
              <div className = "flex justify-between items-center mb-4 px-2" >
                <span className = "text-gray-500 text-lg md:text-xl" > City </span> 
                <div className = "flex items-center gap-2" >
                  {
                    validity.city ? ( 
                      <BsCheckCircleFill className = "text-green-600 text-sm" />
                    ) : ( 
                      <BsExclamationCircleFill className = "text-red-600 text-sm" />
                    )
                  } 
                  <span className = {
                    `text-xs ${validity.city ? 'text-green-500' : "text-red-600"}`
                  } > {
                    validity.city ? "Valid" : "Required"
                  } 
                  </span> 
                </div> 
              </div> 
              <div className = "flex relative" >
                <FaRegAddressCard className = "absolute right-4 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
                <input type = "text"
                  className = "border-2 w-full rounded-md placeholder-text-black placeholder-gray-400 py-2 px-4 md:py-3 md:px-5"
                  placeholder = "Enter your city"
                  value = {
                    profileData.city
                  }
                  onChange = {
                    (e) => handleChange(e, "city")
                  }
                /> 
              </div> 
            </div> 
          </div> 
          <div className = "w-full flex justify-end mt-10" >
            <button onClick = {
              handleSave
            }
            className = "bg-blue-600 text-white py-2 px-6 rounded-md">
              Save 
            </button> 
          </div> 
        </div> 
      </div> 
    </div>
  );
};

export default EditProfileSection;
