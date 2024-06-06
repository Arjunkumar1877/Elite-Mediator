import React, { useState } from 'react';
import { BsCheckCircleFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { auth } from "../firebase/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import OAuth from '../component/OAuth';

interface Errors {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
}


const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [confirmOtp, setConfirmOtp] = useState<any>(null);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let formErrors: Errors = {};
    let isValid = true;

    if (!username) {
      isValid = false;
      formErrors.username = "Username is required";
    }

    if (!email) {
      isValid = false;
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      formErrors.email = "Email is invalid";
    }

    if (!phone) {
      isValid = false;
      formErrors.phone = "Phone number is required";
    }

    if (!password) {
      isValid = false;
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);
    return isValid;
  };
  const onSubmit = async (confirmationResult: any) => {
    try {
      const res = await fetch("/api/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username, email, password, phone, firebaseConfirm: confirmationResult.verificationId
        })
      });
  
      if (res.ok) {
        const { userId } = await res.json();
        navigate(`/verifyOtpPage/${phone}`, { state: { userId } });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const onSendOtp = async () => {
    if (!validateForm()) {
      return;
    } else {
      try {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {});
        const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
  
        if (confirmationResult) {
          setConfirmOtp(confirmationResult);
          onSubmit(confirmationResult);
        } else {
          console.log('Error confirming the captcha.');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  


  console.log(confirmOtp)

  return (
    <div className="flex justify-center h-[700px] w-full">
      <div className="hidden sm:flex sm:flex-1 sm:h-full">
        <img
          src="public/login.jpg"
          alt="Dummy"
          className="h-full object-cover w-full"
        />
      </div>

      <div className="w-full lg:flex-1 h-full bg-sky-100 p-5">
        <div className="bg-white h-full flex flex-col justify-center items-center">
          <h1 className="text-2xl lg:text-3xl">Create an account</h1>
          <p className="text-xs">Enter your email to sign up for this app</p>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Username</span>
              <div className="flex justify-between gap-1">
                {username && (
                  <>
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                    <span className="text-xs text-green-500 text-center">Valid</span>
                  </>
                )}
              </div>
            </div>
            <input
              type="text"
              className="w-[300px] border rounded py-1 px-5"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
          </div>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Email</span>
              <div className="flex justify-between gap-1">
                {email && (
                  <>
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                    <span className="text-xs text-green-500 text-center">Valid</span>
                  </>
                )}
              </div>
            </div>
            <input
              type="text"
              className="w-[300px] border rounded py-1 px-5"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Phone</span>
              <div className="flex justify-between gap-1">
                {phone && (
                  <>
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                    <span className="text-xs text-green-500 text-center">Valid</span>
                  </>
                )}
              </div>
            </div>
            <PhoneInput
              country={'in'}
              value={phone}
              onChange={(phone) => setPhone('+' + phone)}
            />
            {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
          </div>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Password</span>
              <div className="flex justify-between gap-1">
                {password && (
                  <>
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                    <span className="text-xs text-green-500 text-center">Valid</span>
                  </>
                )}
              </div>
            </div>
            <input
              type="password"
              className="w-[300px] border rounded py-1 px-5"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
          </div>

          <div className="w-[300px] mt-6">
            <button className="bg-sky-500 w-full rounded py-1 px-5 text-white hover:bg-sky-600" onClick={onSendOtp}>
              Signup
            </button>
          </div>

          <div className="w-[300px] mt-6" id="recaptcha"></div>

          <div className="mt-5 mb-5 text-sm">
            <Link to="/login">Already have an account</Link>
          </div>

          <div className="flex">
            <span className="text-slate-200">_____________</span>
            <span className="text-slate-300">or continue with</span>
            <span className="text-slate-200">_____________</span>
          </div>

          <div className="w-[300px] mt-6">
            {/* <button className="relative bg-zinc-300 w-full rounded py-1 px-5 text-slate-600 hover:bg-zinc-400">
              <FcGoogle className="absolute left-2 top-2" />
              Google
            </button> */}
            <OAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
