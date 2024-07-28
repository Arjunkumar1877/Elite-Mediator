import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { BsFilePost } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/superAdmin/SuperAdminSlice";
interface SideNavBarProps {
    navShowSet: (show: boolean) => void;
  }




const SuperAdminSideNavbar:  React.FC<SideNavBarProps> = ({navShowSet}) => {
  const [showNav, setShowNav] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    navShowSet(showNav);
  }, [navShowSet, showNav]);

  useEffect(() => {
    const handleResize = () => {
      setShowNav(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignOut = ()=>{
   dispatch(signoutSuccess())
  }


  return (
    <div className="fixed z-20">
      <div
        className={`flex p-1 gap-1 transition-all duration-300 ${
          showNav ? "bg-sky-50 w-[250px]" : "w-[60px]"
        }`}
      >
        {/* <div className="p-4 rounded bg-sky-500 font-sans text-center">EM</div> */}
        <img className=" rounded bg-sky-500 font-sans w-14 text-center" src="https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/logo.png?alt=media&token=d632f87d-5330-4f8d-bf5c-67780c74798d" alt="" />
        <span
          className={`flex justify-center items-center text-2xl transition-all duration-300 whitespace-nowrap ${
            showNav ? "opacity-100" : "opacity-0"
          }`}
        >
          ELITE MEDIATOR
        </span>
      </div>

      <div
        className={`transition-all duration-300 ${
          showNav
            ? "h-screen w-[250px] bg-sky-50"
            : "h-screen w-[60px] bg-sky-50"
        }`}
      >
        <span
          className="hidden md:flex justify-center items-center bg-sky-500 rounded-full w-7 h-7 absolute -right-2 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        >
          {showNav ? (
            <MdKeyboardArrowLeft className="text-3xl" />
          ) : (
            <FaAngleRight className="text-xs" />
          )}
        </span>
        <br />
        <br />

        <div className={`  transition-all duration-300 ${
          showNav
            ? "h-screen w-[250px] bg-sky-50"
            : "h-screen w-[60px] bg-sky-50" } flex flex-col gap-10 relative`}>
       
        <Link
            to="/super_admin_dashboard"
            className={`flex gap-5 self-start ${
              location.pathname === "/super_admin_dashboard" ? "text-black" : "text-sky-500"
            } px-5 hover:text-black cursor-pointer items-center text-xl`}
          >
            <span>
              <RxDashboard />
            </span>
            <span
              className={`text-sm transition-opacity duration-300 ${
                showNav ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              DASHBOARD
            </span>
          </Link>

          <Link
            to="/super_admin_registered_admin_list"
            className={`flex gap-5 self-start ${
              location.pathname === "/super_admin_registered_admin_list"
                ? "text-black"
                : "text-sky-500"
            } px-5 hover:text-black cursor-pointer items-center text-xl`}
          >
            <span>
              <FiUsers />
            </span>
            <span
              className={`text-sm transition-opacity duration-300 ${
                showNav ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              ALL USERS
            </span>
          </Link>

          <Link
            to="/super_admin_poster_page"
            className={`flex gap-5 self-start ${
              location.pathname === "/super_admin_poster_page"
                ? "text-black"
                : "text-sky-500"
            } px-5 hover:text-black cursor-pointer items-center text-xl`}
          >
            <span>
              <BsFilePost />
            </span>
            <span
              className={`text-sm transition-opacity duration-300 ${
                showNav ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
            POSTERS
            </span>
          </Link>

          <div
            onClick={handleSignOut}
            className={`flex gap-5 self-start ${
              location.pathname === "/super_admin"
                ? "text-black"
                : "text-sky-500"
            } px-5 hover:text-black cursor-pointer items-center text-xl`}
          >
            <span>
              <TbLogout2 />
            </span>
            <span
              className={`text-sm transition-opacity duration-300 ${
                showNav ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              LOGOUT{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSideNavbar;
