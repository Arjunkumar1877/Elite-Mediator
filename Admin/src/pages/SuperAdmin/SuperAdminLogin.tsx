import { useState, useEffect } from "react";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  useEffect(() => {
    setEmailValid(validateEmail(email));
    setPasswordValid(validatePassword(password));
  }, [email, password]);

  const handleLogin = () => {
    if (!emailValid || !passwordValid) {
      setLoginError("Please enter valid email and password.");
      return;
    }
    // Handle login logic here
    setLoginError("");
    console.log("Login successful");
  };

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
          <h1 className="text-2xl lg:text-3xl">Login (Super Admin)</h1>

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

            <div className="relative">
              <input
                type={viewPassword ? "text" : "password"}
                className={`w-[300px] border rounded py-1 px-5 ${
                  !passwordValid ? "border-red-500" : ""
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {viewPassword ? (
                <FaEyeSlash
                  className="absolute top-2 right-3 cursor-pointer"
                  onClick={() => setViewPassword(false)}
                />
              ) : (
                <IoEyeSharp
                  className="absolute top-2 right-3 cursor-pointer"
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
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
