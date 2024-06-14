import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsCheckCircleFill } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

type UserType = {
  userId: string;
  adminId: string;
  propId: string;
  username: string;
  purpose: string;
  phone: number | string;
  firebaseCode?: string;
  verified?: boolean;
};

const InitialDataPage = () => {

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
              onClick={onSendOtp}
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