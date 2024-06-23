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
import { Link, useLocation } from "react-router-dom";
import io from 'socket.io-client';

const socket = io('http://localhost:7000');

const SideNavBar = ({ navShowSet }: any) => {
  const [showNav, setShowNav] = useState(true);
  const { currentAdmin } = useSelector((state: any) => state.admin);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    navShowSet(showNav);
  }, [navShowSet, showNav]);

  useEffect(() => {
  
    socket.emit('join room', currentAdmin._id); 
      socket.emit('notify', currentAdmin._id)
   

    socket.on('notify', (unreadCount) => {
      console.log(unreadCount);
      setCount(unreadCount);
      console.log("💕💕💕💕💕💕💕💕💕💕💕 " + unreadCount)
    });

    return () => {
      socket.off('notify');
    };
  }, [currentAdmin._id]);

  useEffect(() => {
    const handleResize = () => {
      setShowNav(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSignout = () => {
    dispatch(signoutSuccess());
  };
  return (
    <div className="fixed z-20">
      <div className={`flex p-1 gap-1 transition-all duration-300 ${showNav ? "bg-sky-50 w-[250px]" : "w-[60px]"}`}>
        <div className="p-4 rounded bg-sky-500 font-sans text-center">EM</div>
        <span className={`flex justify-center items-center text-2xl transition-all duration-300 whitespace-nowrap ${showNav ? "opacity-100" : "opacity-0"}`}>
          ELITE MEDIATOR
        </span>
      </div>

      <div className={`transition-all duration-300 ${showNav ? "h-screen w-[250px] bg-sky-50" : "h-screen w-[60px] bg-sky-50"}`}>
        <span className="hidden md:flex justify-center items-center bg-sky-500 rounded-full w-7 h-7 absolute -right-2 cursor-pointer"
          onClick={() => setShowNav(!showNav)}>
          {showNav ? <MdKeyboardArrowLeft className="text-3xl" /> : <FaAngleRight className="text-xs" />}
        </span>
        <br />
        <br />
        <div className="flex flex-col gap-10 items-center justify-center">
          <Link to="/profile" className={`flex gap-5 ${location.pathname === '/profile' || location.pathname === '/editprofile' ? 'text-black' : 'text-sky-500'} self-start px-5 hover:text-black cursor-pointer items-center text-xl`}>
            <span>
              <FaRegUser />
            </span>
            <span className={`text-sm transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>PROFILE</span>
          </Link>
          <Link to="/dashboard" className={`flex gap-5 self-start ${location.pathname === '/dashboard' ? 'text-black' : 'text-sky-500'} px-5 hover:text-black cursor-pointer items-center text-xl`}>
            <span>
              <RxDashboard />
            </span>
            <span className={`text-sm transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>DASHBOARD</span>
          </Link>
          <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center text-xl">
            <span>
              <TbUsersGroup />
            </span>
            <span className={`text-sm transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>ALL USERS</span>
          </div>
          <Link to="/chat_list" className={`flex gap-5 self-start px-5 hover:text-black cursor-pointer ${location.pathname === '/chat_list' ? 'text-black' : 'text-sky-500'} items-center text-xl`}>
            <span className="flex relative">
              <PiChatsTeardropBold />{
                 count > 0 && <span className="absolute -top-2 -right-2 text-white bg-sky-500 rounded-full w-5 text-sm flex justify-center">{count}</span>
              }
            </span>
            <span className={`text-sm transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>CHATS</span>
          </Link>
          <Link to="/qrCodes" className={`flex gap-5 self-start px-5 hover:text-black cursor-pointer ${location.pathname === '/qrCodes' || location.pathname === '/generate_qr' ? 'text-black' : 'text-sky-500'} items-center text-xl`}>
            <span>
              <BsQrCodeScan />
            </span>
            <span className={`text-sm transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>QR CODE'S</span>
          </Link>
          <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center text-xl" onClick={handleSignout}>
            <span>
              <RiLogoutBoxLine />
            </span>
            <span className={`text-sm transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>LOGOUT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
