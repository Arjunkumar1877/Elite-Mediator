import React, { useState } from "react";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase/firebase";

interface FormDataType {
  address: string;
  state: string;
  city: string;
  pincode: string;
  landmark: string;
  image: string;
}

const UserVerifyData = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.user);
  const [file, setFile] = useState<any>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(
    null
  );
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    address: "",
    state: "",
    city: "",
    pincode: "",
    landmark: "",
    image: currentUser?.image || "",
  });

  console.log(formData);
console.log(currentUser._id)
  const [formErrors, setFormErrors] = useState({
    address: false,
    state: false,
    city: false,
    pincode: false,
    landmark: false,
    image: false,
  });

  const validateInput = (key: keyof FormDataType, value: string): boolean => {
    if (key === "pincode") {
      return /^\d{6}$/.test(value); 
    }
    return value.trim() !== "";
  };

  const handleImageUpload = async () => {
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
            setFormData((prevData) => ({ ...prevData, image: downloadURL }));
            setFormErrors((prevErrors) => ({ ...prevErrors, image: false }));
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  const handleChange =
    (key: keyof FormDataType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prevData) => ({ ...prevData, [key]: value }));
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [key]: !validateInput(key, value),
      }));
    };

  const handleSubmit = async () => {
    const isValidForm = Object.entries(formData).every(([key, value]) =>
      validateInput(key as keyof FormDataType, value)
    );

    if (!isValidForm) {
      setFormErrors({
        address: !validateInput("address", formData.address),
        state: !validateInput("state", formData.state),
        city: !validateInput("city", formData.city),
        pincode: !validateInput("pincode", formData.pincode),
        landmark: !validateInput("landmark", formData.landmark),
        image: !validateInput("image", formData.image),
      });
      return;
    }

    try {
      const res = await fetch(`/api/update_admin/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.updated) {
        navigate("/profile");
      }else{
        console.log("error updating the profile");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <div>
      <div className="absolute z-0 rounded-2xl -top-14 sm:ml-30 md:ml-28 lg:left-64 transform translate-x-1/2 -translate-y-1/2 bg-zinc-300 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>
      <h1 className="relative font-semibold text-2xl z-10 flex justify-center items-center mt-8 text-center md:text-5xl">
        WE KEEP YOUR DATA SAFE IN OUR HANDS
      </h1>
      <div className="p-10 z-10">
        <div className="flex flex-col justify-center items-center border-2 relative rounded-md z-10 px-8">
          <div className="relative p-2 self-center h-[150px] w-[150px] cursor-pointer mt-8 mb-16">
            <input
              type="file"
              id="fileInput"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e: any) => {
                setFile(e.target.files[0]);
                handleImageUpload();
              }}
            />
            <img
              src={formData.image || file}
              className="w-full h-full object-cover rounded-full"
              alt="User Icon"
            />
          </div>
          {imageUploadProgress !== null && (
            <div className="w-full bg-gray-200 rounded-full">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${imageUploadProgress}%` }}
              >
                {imageUploadProgress}%
              </div>
            </div>
          )}
          {imageUploadError && (
            <div className="text-red-500 mt-2">{imageUploadError}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-28 mb-20">
            {Object.keys(formData).map((key) => {
              if (key !== "image") {
                const error = formErrors[key as keyof FormDataType];
                return (
                  <div key={key}>
                    <div className="flex justify-between px-2">
                      <span className="text-zinc-500 md:text-xl">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <div className="flex justify-between gap-1">
                        {formData[key as keyof FormDataType] &&
                          (error ? (
                            <BsXCircleFill className="text-red-600 text-xs" />
                          ) : (
                            <BsCheckCircleFill className="text-green-600 text-xs" />
                          ))}
                        <span
                          className={`text-xs text-center ${
                            error ? "text-red-500" : "text-green-500"
                          }`}
                        >
                          {formData[key as keyof FormDataType].length > 0 &&
                            (error ? "Invalid" : "Valid")}
                        </span>
                      </div>
                    </div>
                    <input
                      type="text"
                      className={`w-[300px] border-2 px-4 py-3 rounded-lg lg:w-[400px] ${
                        error ? "border-red-500" : ""
                      }`}
                      placeholder={`Enter your ${
                        key.charAt(0).toUpperCase() + key.slice(1)
                      }`}
                      value={formData[key as keyof FormDataType]}
                      onChange={handleChange(key as keyof FormDataType)}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={handleSubmit}
            className="px-10 py-3 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition duration-300 mb-10"
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserVerifyData;
