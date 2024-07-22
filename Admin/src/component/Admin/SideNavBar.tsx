import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { TbUsersGroup } from "react-icons/tb";
import { PiChatsTeardropBold } from "react-icons/pi";
import { BsQrCodeScan } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../../redux/admin/adminSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import io from 'socket.io-client';
import { useSocket } from "../../contexts/AdminContext";
import toast from "react-hot-toast";
import axios from "axios";

// const socket = io('http://localhost:7000');

interface SideNavBarProps {
  navShowSet: (show: boolean) => void;
}

const SideNavBar: React.FC<SideNavBarProps> = ({ navShowSet }) => {
  const [showNav, setShowNav] = useState<boolean>(true);
  const { currentAdmin } = useSelector((state: any) => state.admin);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { socket } = useSocket();
  const location = useLocation();
  const { notificationCount, setNotificationCount }: any = useSocket();
  // console.log(location.pathname);
  console.log("side navbar rendering 💕💕💕💕💕💕");

  useEffect(() => {
    navShowSet(showNav);
  }, [navShowSet, showNav]);


  const fetchAdminData = async()=>{
    try {
      const response = await axios.get(`/api/get_admin/${currentAdmin._id}`);

      if(response.data.blocked){
       dispatch(signoutSuccess());
       toast("You are blocked by the super Admin")
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleNotify = (unreadCount: any) => {
    console.log(unreadCount);
    setNotificationCount(unreadCount);
    toast(`You have ${unreadCount} unread messages`, {
      duration: 900,
    });
  };

  useEffect(() => {
    fetchAdminData()
    if (currentAdmin && currentAdmin._id) {
      socket.emit("join room", currentAdmin._id);

      socket.on("join room", (data)=>{
        console.log(data);
        console.log("socket connected 📀🔥💕💕💕💕")
      })

      // socket.emit("notify", currentAdmin._id);
      if (location.pathname !== "/chat_list") {
        if (location.pathname !== "/admin_chat") {
          socket.on("notify", handleNotify);
        }
      }
    }

    socket.on("incoming-call", (data: any) => {
      if (location.pathname !== `/admin_chat?conId=${data.conId}`) {
        console.log("emitted on side nave bar....🤷‍♂️🤷‍♂️🤷‍♂️💕💕🔥🔥🔥🔥");
        navigate(
          `/call_admin_page?conId=${data.conId}&incommingId=${data.incommingId}&callerId=${data.callerId}`
        );
      }
    });

    return () => {
      socket.off("notify", handleNotify);
    };
  }, [currentAdmin]);

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

  const handleSignout = async () => {
    const res = await fetch("/api/admin_logout");
    const data: any = await res.json();
    console.log(data);
    if (data.message === "success") {
      dispatch(signoutSuccess());
    } else {
      toast("sigout failed token not cleared");
    }
  };

  return (
    <div className="fixed z-20 bg-sky-50 h-full">
      <div
        className={`flex p-1 gap-1 transition-all duration-300 ${
          showNav ? "bg-sky-50 w-[250px]" : "w-[60px]"
        }`}
      >
        <div className="p-4 rounded bg-sky-500 font-sans text-center">EM</div>
        <span
          className={`flex justify-center items-center text-2xl transition-all duration-300 whitespace-nowrap ${
            showNav ? "opacity-100" : "opacity-0"
          }`}
        >
          ELITE MEDIATOR
        </span>
      </div>

      <div
        className={`
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
        <div className="flex flex-col gap-10 items-center justify-center">
          <Link
            to="/profile"
            className={`flex gap-5 ${
              location.pathname === "/profile" ||
              location.pathname === "/editprofile"
                ? "text-black"
                : "text-sky-500"
            } self-start px-5 hover:text-black cursor-pointer items-center text-xl`}
          >
            <span>
              <FaRegUser />
            </span>
            <span
              className={`text-sm transition-opacity duration-300 ${
                showNav ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              PROFILE
            </span>
          </Link>

          <Link
            to="/dashboard"
            className={`flex gap-5 self-start ${
              location.pathname === "/dashboard" ? "text-black" : "text-sky-500"
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
            to={"/visitors"}
            className={`flex gap-5 self-start px-5 hover:text-black cursor-pointer  items-center text-xl ${
              location.pathname === "/visitors" ? "text-black" : "text-sky-500"
            }`}
          >
            <span>
              <TbUsersGroup />
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
            to="/chat_list"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative flex gap-5 self-start px-5 hover:text-black cursor-pointer ${
              location.pathname === "/chat_list" ? "text-black" : "text-sky-500"
            } items-center text-xl`}
          >
            <span className="flex relative">
              <PiChatsTeardropBold />
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 text-white bg-sky-500 rounded-full w-5 h-5 text-sm flex justify-center items-center">
                  {notificationCount}
                </span>
              )}
            </span>
            <span
              className={`text-sm transition-opacity duration-300 ${
                showNav ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              CHATS
            </span>
            {notificationCount > 0 && isHovered && (
              <span className="absolute w-40 left-12 bottom-12 bg-slate-800 text-white text-xs md:text-sm   rounded-lg py-3 px-5 z-10">
                You have {notificationCount} unread messages
              </span>
            )}
          </Link>

          <Link
            to="/qrCodes"
            className={`flex gap-5 self-start px-5 hover:text-black cursor-pointer ${
              location.pathname === "/qrCodes" ||
              location.pathname === "/generate_qr"
                ? "text-black"
                : "text-sky-500"
            } items-center text-xl`}
          >
            <span>
              <BsQrCodeScan />
            </span>
            <span
              className={`text-sm transition-opacity duration-300 ${
                showNav ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              QR CODE'S
            </span>
          </Link>

          <div
            className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center text-xl"
            onClick={handleSignout}
          >
            <span>
              <RiLogoutBoxLine />
            </span>
            <span
              className={`text-sm transition-opacity duration-300 ${
                showNav ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              LOGOUT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
