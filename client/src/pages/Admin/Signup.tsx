import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import OAuth from "../../component/Admin/OAuth";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import { TailSpin } from 'react-loader-spinner'
// import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

interface Errors {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
}

type PostersDataType = {
  _id: string;
  imageUrl: string;
};

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [confirmOtp, setConfirmOtp] = useState<any>(null);
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [showEmailVerifyButton, setShowEmailVerifyButton] =
    useState<boolean>(false);
  const [posters, setPosters] = useState<PostersDataType[]>([]);
  const { currentAdmin } = useSelector((state: any) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchPosters();
    if (currentAdmin && currentAdmin.address) {
      navigate("/profile");
    } else if (currentAdmin && !currentAdmin.address) {
      navigate("/admin-data");
    }
  }, []);

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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phone,
          firebaseConfirm: confirmationResult,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (
          data === "Phone number already exists" ||
          data === "Email already exists"
        ) {
          return toast(data);
        }

        toast("Verification message sucessfully send to your mobile");
        navigate(`/verify_otp_page/${phone}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSendOtp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      );

      if (confirmationResult) {
        setConfirmOtp(confirmationResult);
        onSubmit(confirmationResult.verificationId);
      } else {
        toast.error("Error confirming the reCAPTCHA. Please try again.");
      }
    } catch (error: any) {
      console.log("Error:", error);
      handleFirebaseError(error);
    }
  };

  const handleFirebaseError = (error: any) => {
    switch (error.code) {
      case "auth/invalid-app-credential":
        toast.error(
          "Otp limit reached please try email verification by clicking the email verifiy button to signup"
        );
        setShowEmailVerifyButton(true);
        break;
      case "auth/invalid-phone-number":
        toast.error("Invalid phone number. Please enter a valid phone number.");
        break;
      case "auth/missing-phone-number":
        toast.error("Phone number is missing. Please provide a phone number.");
        break;
      case "auth/quota-exceeded":
        toast.error(
          "Otp limit reached please try email verification by clicking the email verifiy button to signup"
        );
        setShowEmailVerifyButton(true);
        break;
      case "auth/captcha-check-failed":
        toast.error("reCAPTCHA verification failed. Please try again.");
        break;
      case "auth/user-disabled":
        toast.error(
          "This user account has been disabled. Please contact support."
        );
        break;
      default:
        toast.error(
          "Otp limit reached please try email verification by clicking the email verifiy button to signup"
        );
        setShowEmailVerifyButton(true);
    }
  };

  const handleFetchPosters = async () => {
    try {
      const response = await axios.get("/superAdmin/get_posters");
      setPosters(response.data);
    } catch (error) {
      console.log(error);
      toast("Failed to fetch posters.");
    }
  };

  useEffect(() => {
    handleFetchPosters();
  }, []);

  const handleSendingEmail = async (id: string) => {
    try {
      const res = await axios.get(`/api/send_email_otp?id=${id}`);

      if (res.data.success) {
        toast("Verification message sucessfully send to your Email");
        navigate(`/verify_otp_email?phone=${res?.data.data?.phone}&reset=false`);
      } else {
        toast("Email sending failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmailOtp = async () => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phone,
          firebaseConfirm: "hai",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (
          data === "Phone number already exists" ||
          data === "Email already exists"
        ) {
          return toast(data);
        }

        handleSendingEmail(data._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(confirmOtp);

  if(!posters[9]){
    return(
      <div className="w-full h-screen flex justify-center items-center relative z-10 overflow-x-hidden">
       <TailSpin   
    height="80"
    width="80"
    color="#00ABE4"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
/>
    </div>
    )
  }


  return (
    <div className="flex justify-center h-screen w-full">
      <div className="hidden sm:flex sm:flex-1 sm:h-full">
        <img
          src={
            posters.length > 0
              ? posters[9].imageUrl
              : "https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/login.jpg?alt=media&token=23fd7400-7426-40c8-87c3-dc4c1eabc8c9"
          }
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
                    <span className="text-xs text-green-500 text-center">
                      Valid
                    </span>
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
            {errors.username && (
              <span className="text-red-500 text-xs">{errors.username}</span>
            )}
          </div>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Email</span>
              <div className="flex justify-between gap-1">
                {email && (
                  <>
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                    <span className="text-xs text-green-500 text-center">
                      Valid
                    </span>
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
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Phone</span>
              <div className="flex justify-between gap-1">
                {phone && (
                  <>
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                    <span className="text-xs text-green-500 text-center">
                      Valid
                    </span>
                  </>
                )}
              </div>
            </div>
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={(phone) => setPhone("+" + phone)}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">{errors.phone}</span>
            )}
          </div>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Password</span>
              <div className="flex justify-between gap-1 relative">
                {password && (
                  <>
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                    <span className="text-xs text-green-500 text-center">
                      Valid
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <input
                type={`${viewPassword ? "text" : "password"}`}
                className="w-[300px] border rounded py-1 px-5"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {viewPassword ? (
                <FaEyeSlash
                  className="absolute top-2 right-3"
                  onClick={() => setViewPassword(false)}
                />
              ) : (
                <IoEyeSharp
                  className="absolute top-2 right-3"
                  onClick={() => setViewPassword(true)}
                />
              )}
            </div>

            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password}</span>
            )}
          </div>

          <div className="w-[300px] mt-6">
            {!showEmailVerifyButton ? (
              <button
                className="bg-sky-500 w-full rounded py-1 px-5 text-white hover:bg-sky-600"
                onClick={onSendOtp}
              >
                Signup
              </button>
            ) : (
              <button
                className="bg-sky-500 w-full rounded py-1 px-5 text-white hover:bg-sky-600"
                onClick={sendEmailOtp}
              >
                Signup verify by email
              </button>
            )}
          </div>

          {!showEmailVerifyButton && (
            <div className="w-[300px] mt-6" id="recaptcha"></div>
          )}

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
