import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCheckCircleFill } from "react-icons/bs";
import {  useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {  signInSuccess, signoutSuccess } from "../../redux/user/UserSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

type UserType = {
  _id?: string;
  userId: string;
  adminId: string;
  propId: string;
  username: string;
  purpose: string;
  phone: number | string;
  firebaseCode?: string;
  verified?: boolean;
  conversationId?: string;
};

export interface PropertyDataType {
  _id: string;
  adminId: string;
  propId: string;
  propertyName: string;
  propertyAddress: string;
  allowVedioCalls: boolean;
  userType: string;
  url: string;
  deleted: boolean;
  verified?: boolean;
  code: string;
}

const InitialDataPage = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [propertyData, setPropertyData] = useState<PropertyDataType>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const adminIdQ = query.get("adminId");
  const propIdQ = query.get("propId");

  const [formData, setFormData] = useState<UserType>({
    userId: "12345678",
    adminId: adminIdQ || "",
    propId: propertyData?._id || "",
    username: "",
    purpose: "",
    phone: "",
    verified: false,
    firebaseCode: "",
  });



  console.log(formData);
  console.log(propertyData)
 const phonenum:number = 0;
   
  const loginUnkown = async (propertyId: string) => {
    try {
      const userIdS = Date.now() + "000000";
      const res = await fetch("/user/create_unknown_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userIdS,
          adminId: adminIdQ,
          propId: propertyId,
          username: "Unknown",
          purpose: "Unknown contact",
          phone: phonenum,
          firebaseCode: "0000000000",
          verified: true,
        }),
      });
  
      if (res.ok) {
        const createdUserData = await res.json();
        if (createdUserData) {
          try {
            const response = await axios.post("/user/start_conversation", {
              userId: createdUserData._id,
              adminId: createdUserData.adminId,
              propertyId: propertyId,
            });
  
            if (response.data) {
              toast("successful!");
              dispatch(signInSuccess(response.data.user));
              navigate(`/chat_user?conId=${response.data.user.conversationId}`);
            }
          } catch (error) {
            console.error("Error starting conversation:", error);
          }
        }
      } else {
        throw new Error("Failed to create unknown user");
      }
    } catch (error) {
      console.error("Error creating unknown user:", error);
      toast.error("Failed to create unknown user. Please try again.");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("/user/get_admins_property_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propId: propIdQ, adminId: adminIdQ }),
        });
  
        if (resp.ok) {
          const adminsPropertyData = await resp.json();
          setFormData({...formData, propId: adminsPropertyData._id});
          setPropertyData(adminsPropertyData);
  
          if (currentUser && currentUser.propId === adminsPropertyData._id) {
            toast("You have an old chat list here");
            navigate(`/chat_user?conId=${currentUser.conversationId}`);
          } else {
            dispatch(signoutSuccess());
  
            if (adminsPropertyData.userType === "Unknown" && !adminsPropertyData.deleted) {
              loginUnkown(adminsPropertyData._id);
            }
          }
        } else {
          throw new Error("Failed to fetch property data");
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
        toast.error("Failed to fetch property data. Please try again.");
      }
    };
  
    fetchData();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const validateForm = () => {
    return formData.username && formData.purpose && formData.phone;
  };

  const formSubmit = async () => {
    if (!validateForm()) {
      return toast.error("Please fill out all fields.");
    }

    if (propertyData?.userType === "Unverified") {
      const userIdS = formData.phone + "" + Date.now();
      const updatedFormData = {
        ...formData,
        username: formData.username + "(unverified)",
        userId: userIdS,
      };
      const res = await fetch("/user/create_unverified_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const createdUnverifieduserData = await res.json();

      if (createdUnverifieduserData) {
        try {
          const response = await axios.post("/user/start_conversation", {
            userId: createdUnverifieduserData._id,
            adminId: createdUnverifieduserData.adminId,
            propertyId: propertyData?._id,
          });

          if (response.data) {
            toast("successful!");
            dispatch(signInSuccess(response.data.user));
            navigate(`/chat_user?conId=${response.data.user.conversationId}`);
          }
        } catch (error) {
          console.error("Error starting conversation:", error);
        }
      }
    } else if (propertyData?.userType === "Verified") {
      onSendOtp();
    }
  };

  const createUserData = async (updatedFormData: UserType) => {
    try {


      const res = await fetch("/user/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      if (data.message === "User already exists") {
        navigate(`/user_verify_otp_page/${data.data._id}`);
      } else {
        navigate(`/user_verify_otp_page/${data.data._id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onSendOtp = async () => {
    if (!validateForm()) {
      return toast.error("Please fill out all fields.");
    }

    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {});
      const phoneNum = "+" + formData.phone;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNum, recaptchaVerifier);

      if (confirmationResult) {
        const userIdS = formData.phone + "" + Date.now();
        const updatedFormData = {
          ...formData,
          userId: userIdS,
          firebaseCode: confirmationResult.verificationId,
        };

        setFormData(updatedFormData);
        createUserData(updatedFormData);
      } else {
        console.log("Error confirming the captcha.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };


// console.log(formData);
// console.log(propertyData)


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="absolute z-0 rounded-2xl -top-40 left-1/2 transform -translate-x-1/2 bg-sky-500 w-60 h-40 lg:h-96 rotate-45"></div>
      <div className="w-full flex justify-end p-4">
        <button className="bg-sky-500 py-2 px-3 rounded text-white hover:bg-sky-700">
          Register
        </button>
      </div>

      <div className="w-full max-w-4xl mx-auto p-4 lg:px-16">
        <div className="p-6 lg:p-10 flex flex-col justify-center items-center rounded relative z-10 border-2 bg-white gap-5 shadow-md">
          <h1 className="uppercase text-lg lg:text-2xl text-center font-bold tracking-wider">
            Enter User Details
          </h1>
          <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex flex-col">
              <div className="flex justify-between px-2 lg:px-10">
                <span>Name</span>
                {formData?.username && (
                  <div className="flex gap-2 items-center">
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                    <span>Valid</span>
                  </div>
                )}
              </div>
              <input
                type="text"
                onChange={handleChange}
                value={formData?.username}
                name="username"
                className="rounded border-2 w-full px-5 lg:w-[600px] py-3 placeholder:font-semibold placeholder:px-2 lg:placeholder:px-6"
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between px-2 lg:px-10">
                <span>Purpose</span>
                {formData?.purpose && (
                  <div className="flex gap-2 items-center">
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                    <span>Valid</span>
                  </div>
                )}
              </div>
              <input
                type="text"
                onChange={handleChange}
                value={formData?.purpose}
                name="purpose"
                className="rounded border-2 w-full px-5 lg:w-[600px] py-3 placeholder:font-semibold placeholder:px-2 lg:placeholder:px-6"
                placeholder="Enter purpose of contacting"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between px-2 lg:px-10">
                <span>Phone</span>
                {formData.phone && (
                  <div className="flex gap-2 items-center">
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                    <span>Valid</span>
                  </div>
                )}
              </div>
              <PhoneInput
                country={"in"}
                value={formData?.phone as any}
                onChange={handlePhoneChange}
                containerClass="rounded border-2 w-full px-5 lg:w-[600px] py-3 placeholder:font-semibold placeholder:px-2 lg:placeholder:px-6"
                inputClass="w-full"
                placeholder="Enter your phone"
              />
            </div>
          </div>

          <div id="recaptcha" className="recaptcha"></div>

          <div>
            <button
              className="bg-sky-500 py-2 px-4 rounded text-white hover:bg-sky-700"
              onClick={formSubmit}
              disabled={!validateForm()}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialDataPage;




