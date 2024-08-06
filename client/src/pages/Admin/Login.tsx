import React, { useEffect, useState } from "react";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess } from "../../redux/admin/adminSlice";
import { FaEyeSlash } from "react-icons/fa";
import OAuth from "../../component/Admin/OAuth";
import { IoEyeSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";

type PostersDataType = {
  _id: string;
  imageUrl: string;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const { currentAdmin } = useSelector((state: any) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posters, setPosters] = useState<PostersDataType[]>([]);

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
    if (currentAdmin && currentAdmin.address) {
      navigate("/profile");
    } else if (currentAdmin && !currentAdmin.address) {
      navigate("/admin-data");
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleLogin = async (): Promise<void> => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    dispatch(signInStart());

    try {
      const res = await fetch("/api/admin_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        console.log("Login successful:", data);
        if (data === "Invalid credentials") {
          toast(data);
        }

        if (data !== "Invalid credentials") {
          if (data && !data?.address) {
            navigate("/admin-data");
            dispatch(signInSuccess(data));
          } else if (data && data?.address) {
            dispatch(signInSuccess(data));
            navigate("/profile");
          }
        }
      } else {
        const errorData = await res.json();
        setLoginError(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
      console.log("Error logging in:", error);
    }
  };


  const handleSendingEmail = async (id: string, phone: number) => {
    try {
      const res = await axios.get(`/api/send_email_otp?id=${id}`);

      if (res.data.success) {
        toast("Verification message sucessfully send to your Email");
        navigate(`/verify_otp_email?phone=${phone}&reset=true`);
      } else {
        toast("Email sending failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };





  const handleSendotpForgotpassword = async () => {
    try {

      if(!email){
        return toast("Enter email to proceed with password resetting.")
      }
      const res = await axios.get(`/api/get_admin_by_email/${email}`);

      if(res.data){
     handleSendingEmail(res.data._id, res.data.phone);
      }else{
        toast("Email doesnot exisit...")
      }


    } catch (error) {
      console.log(error);
    }
  };


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
          <h1 className="text-2xl lg:text-3xl">Login</h1>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Email</span>
              <div className="flex justify-between gap-1">
                {email &&
                  (emailValid ? (
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                  ) : (
                    <BsXCircleFill className="text-red-600 text-xs" />
                  ))}
                <span
                  className={`text-xs text-center ${
                    emailValid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {email.length > 0 && (emailValid ? "Valid" : "Invalid")}
                </span>
              </div>
            </div>
            <input
              type="text"
              className={`w-[300px] border rounded py-1 px-5 ${
                !emailValid ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Password</span>
              <div className="flex justify-between gap-1">
                {password &&
                  (passwordValid ? (
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                  ) : (
                    <BsXCircleFill className="text-red-600 text-xs" />
                  ))}
                <span
                  className={`text-xs text-center ${
                    passwordValid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {password.length > 0 && (passwordValid ? "Valid" : "Invalid")}
                </span>
              </div>
            </div>

            <div className=" relative ">
              <input
                type={`${viewPassword ? "text" : "password"}`}
                className={`w-[300px] border rounded py-1 px-5${
                  !passwordValid ? "border-red-500" : ""
                }`}
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
          </div>

          {loginError && (
            <div className="text-red-500 text-sm mt-2">{loginError}</div>
          )}

          <div className="w-[300px] mt-6">
            <button
              onClick={handleLogin}
              className="bg-sky-500 w-full rounded py-1 px-5 text-white hover:bg-sky-600"
            >
              Login
            </button>
          </div>

          <div className="mt-5 mb-5 text-sm">
            <button onClick={handleSendotpForgotpassword}>Forgot password?</button>
          </div>
          <div className="mt-5 mb-5 text-blue-700 text-sm">
            <Link to="/signup">Click here to sign up</Link>
          </div>

          <div className="flex items-center mt-5">
            <span className="border-t border-gray-300 flex-grow mr-3"></span>
            <span className="text-gray-400">or continue with</span>
            <span className="border-t border-gray-300 flex-grow ml-3"></span>
          </div>

          <div className="w-[300px] mt-6">
            <OAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
