import { BsCheckCircleFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex justify-center h-[700px] w-full">
      <div className="hidden sm:flex sm:flex-1 sm:h-full">
        <img
          src="public/login.jpg"
          alt="Dummy"
          className="h-full object-cover w-full"
        />
      </div>

      <div className="w-full  lg:flex-1 h-full bg-sky-100 p-5">
        <div className="bg-white h-full flex flex-col justify-center items-center">
          <h1 className="text-2xl lg:text-3xl">Create an account</h1>
          <p className="text-xs  ">Enter your email to sign up for this app</p>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Username</span>
              <div className="flex justify-between gap-1">
                <BsCheckCircleFill className="text-green-600 text-xs" />
                <span className="text-xs text-green-500 text-center">
                  Valid
                </span>
              </div>
            </div>
            <input
              type="text"
              className="w-[300px] border rounded py-1 px-5"
              placeholder="Enter your username"
            />
          </div>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Email</span>
              <div className="flex justify-between gap-1">
                <BsCheckCircleFill className="text-green-600 text-xs" />
                <span className="text-xs text-green-500 text-center">
                  Valid
                </span>
              </div>
            </div>
            <input
              type="text"
              className="w-[300px] border rounded py-1 px-5"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Phone</span>
              <div className="flex justify-between gap-1">
                <BsCheckCircleFill className="text-green-600 text-xs" />
                <span className="text-xs text-green-500 text-center">
                  Valid
                </span>
              </div>
            </div>
            <input
              type="text"
              className="w-[300px] border rounded py-1 px-5"
              placeholder="Enter your phone"
            />
          </div>

          <div className="flex flex-col pt-5">
            <div className="flex justify-between px-5 py-1">
              <span className="text-xs text-zinc-500">Password</span>
              <div className="flex justify-between gap-1">
                <BsCheckCircleFill className="text-green-600 text-xs" />
                <span className="text-xs text-green-500 text-center">
                  Valid
                </span>
              </div>
            </div>
            <input
              type="text"
              className="w-[300px] border rounded py-1 px-5"
              placeholder="Enter your password"
            />
          </div>

          <div className=" w-[300px] mt-6">
            <button className="bg-sky-500 w-full rounded py-1 px-5 text-white hover:bg-sky-600 ">
              Signup
            </button>
          </div>

          <div className="mt-5 mb-5 text-sm">
            <Link to={"/login"}>Already have an account</Link>
          </div>

          <div className="flex">
            <span className="text-slate-200">_____________</span>
            <span className="text-slate-300">or continue with</span>
            <span className="text-slate-200">_____________</span>
          </div>

          <div className=" w-[300px] mt-6">
            <button className="relative bg-zinc-300 w-full rounded py-1 px-5 text-slate-600   hover:bg-zinc-400">
              <FcGoogle className="absolute left-2 top-2" />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
