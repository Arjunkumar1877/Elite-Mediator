import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { TbUsersGroup } from "react-icons/tb";
import { PiChatsTeardropBold } from "react-icons/pi";
import { BsQrCodeScan } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import { MdKeyboardArrowLeft } from "react-icons/md";

const SideNavBar = ({ navShowSet }: { navShowSet: (showNav: boolean) => void; }) => {
  const [showNav, setShowNav] = useState<boolean>(true);

  useEffect(() => {
    navShowSet(showNav);
  }, [navShowSet, showNav]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed z-20">
      <div className={`flex p-1 gap-1 transition-all duration-300 ${showNav ? "bg-sky-50 w-[250px]" : "w-[60px]"}`}>
        <div className="p-4 rounded bg-sky-500 font-sans text-center">EM</div>
        <span className={`flex justify-center items-center text-2xl transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>
          ELITE MEDIATOR
        </span>
      </div>

      <div className={`transition-all duration-300 ${showNav ? "h-screen w-[250px] bg-sky-50" : "h-screen w-[60px] bg-sky-50"}`}>
        <span className="hidden md:flex justify-center items-center bg-sky-500 rounded-full w-5 h-5 absolute -right-2 cursor-pointer"
          onClick={() => setShowNav(!showNav)}>
          {showNav ? <MdKeyboardArrowLeft className="text-3xl" /> : <FaAngleRight className="text-xs" />}
        </span>
        <br />
        <br />
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer items-center text-xl">
            <span>
              <FaRegUser />
            </span>
            <span className={`text-sm transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>PROFILE</span>
          </div>

          <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center text-xl">
            <span>
              <RxDashboard />
            </span>
            <span className={`text-sm transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>DASHBOARD</span>
          </div>

          <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center text-xl">
            <span>
              <TbUsersGroup />
            </span>
            <span className={`text-sm transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>ALL USERS</span>
          </div>

          <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center text-xl">
            <span>
              <PiChatsTeardropBold />
            </span>
            <span className={`text-sm transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>CHATS</span>
          </div>

          <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center text-xl">
            <span>
              <BsQrCodeScan />
            </span>
            <span className={`text-sm transition-opacity duration-300 ${showNav ? "opacity-100" : "opacity-0 hidden"}`}>QR CODE'S</span>
          </div>

          <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center text-xl">
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
