import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCheckCircleFill } from "react-icons/bs";
import { json, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, signInSuccess, signoutSuccess } from "../../redux/user/UserSlice";
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
    userId: "",
    adminId: adminIdQ || "",
    propId: propIdQ || "",
    username: "",
    purpose: "",
    phone: "",
    verified: false,
    firebaseCode: "",
  });


  useEffect(()=>{
    if(currentUser){

      if(currentUser.propId === propIdQ){
        console.log(currentUser)
        toast("You have an old chat list here")
        navigate(`/chat_user?conId=${currentUser.conversationId}`);
      }
    }else{
      const fetchPropertyData = async()=>{
        const res = await fetch("/user/get_admins_property_data", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({propId: propIdQ, adminId: adminIdQ})
        })
    
        if(res.ok){
          const adminsPropertyData = await res.json();
          setPropertyData(adminsPropertyData);
          if(adminsPropertyData.userType === 'Unknown' && !adminsPropertyData?.deleted){
            const userIdS = Date.now() + '000000'
            const res = await fetch("/user/create_user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: userIdS,
                adminId: adminIdQ,
                propId: propIdQ,
                username: "Unknown",
                purpose: "Unknown contact",
                phone: Date.now(),
                firebaseCode: "0000000000",
                verified: true
              }),
            });
    
            if(res.ok){
              const createdUserData = await res.json();
              console.log(createdUserData)
              if(createdUserData.data){
                try {
                  const response = await axios.post("/user/start_conversation", {
                    userId: createdUserData.data._id,
                    adminId: createdUserData.data.adminId,
                    propertyId: createdUserData.data.propId,
                  });
    
                  if (response.data) {
                    console.log("Conversation created:", response.data);
                    toast("successful!");
                    dispatch(signInSuccess(response.data.user));
                    navigate(`/chat_user?conId=${response.data.user.conversationId}`);
                  }
                } catch (error) {
                  console.error("Error starting conversation:", error);
                }
              }
            }
          }   
        }
      }
    
      fetchPropertyData();
    
    }
  }, [])


console.log(propertyData)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return formData.username && formData.purpose && formData.phone;
  };


  const formSubmit = async()=>{
    if (!validateForm()) {
      return toast.error("Please fill out all fields.");
    }

    if(propertyData?.userType === 'Unverified'){
      const userIdS = formData.phone + "" + Date.now();
      const updatedFormData = {
        ...formData,
        username: formData.username + '(unverified)',
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

    if(createdUnverifieduserData){
      try {
        const response = await axios.post("/user/start_conversation", {
          userId: createdUnverifieduserData._id,
          adminId: createdUnverifieduserData.adminId,
          propertyId: createdUnverifieduserData.propId,
        });

        if (response.data) {
          console.log("Conversation created:", response.data);
          toast("successful!");
          dispatch(signInSuccess(response.data.user));
          navigate(`/chat_user?conId=${response.data.user.conversationId}`);
        }
      } catch (error) {
        console.error("Error starting conversation:", error);
      }
    }



    }else{
      onSendOtp();
    }
  }


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

    if (data.message === 'User already exists') {
      navigate(`/user_verify_otp_page/${data.data._id}`);
    }else{
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
      const phoneNum = "+91" + formData.phone;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNum,
        recaptchaVerifier
      );

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

  console.log(currentUser);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="absolute z-0 rounded-2xl -top-40 left-1/2 transform -translate-x-1/2 bg-sky-500 w-60 h-40 lg:h-96 rotate-45"></div>
      <div className="w-full flex justify-end p-4">
        <button className="bg-sky-500 py-2 px-3 rounded text-white hover:bg-sky-700">
          Register
        </button>
      </div>

      <div className="w-full max-w-4xl mx-auto p-1 px-4 lg:px-16">
        <div className="p-6 lg:p-10 flex flex-col justify-center items-center rounded relative z-10 border-2 bg-white gap-5 shadow-md">
          <h1 className="uppercase text-lg lg:text-4xl font-semibold text-center p-4 lg:p-10 w-full">
            Now onward you don’t need to wait to reach out{" "}
            <span className="uppercase text-sky-500">the people you need</span>
          </h1>
          <div className="w-full flex flex-col gap-1 justify-center text-zinc-400">
            <div className="flex justify-between px-2 lg:px-10">
              <span>Name</span>
              {formData.username && (
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

          <div className="w-full flex flex-col gap-1 text-zinc-400">
            <div className="flex justify-between px-2 lg:px-6">
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

          <div className="w-full flex flex-col gap-1 text-zinc-400">
            <div className="flex justify-between px-2 lg:px-6">
              <span>Phone</span>
              {formData.phone && (
                <div className="flex gap-2 items-center">
                  <BsCheckCircleFill className="text-green-600 text-xs" />
                  <span>Valid</span>
                </div>
              )}
            </div>
            <input
              type="text"
              onChange={handleChange}
              value={formData?.phone}
              name="phone"
              className="rounded border-2 w-full px-5 lg:w-[600px] py-3 placeholder:font-semibold placeholder:px-2 lg:placeholder:px-6"
              placeholder="Enter your phone"
            />
          </div>

          <div id="recaptcha" className="recaptcha"></div>

          <div>
            <button
              className="bg-sky-500 py-2 px-4 rounded text-white hover:bg-sky-700"
              onClick={formSubmit}
              disabled={!validateForm}
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
