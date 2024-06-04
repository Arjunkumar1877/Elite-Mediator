import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { TbUsersGroup } from "react-icons/tb";
import { PiChatsTeardropBold } from "react-icons/pi";
import { BsQrCodeScan } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import { MdKeyboardArrowLeft } from "react-icons/md";



const SideNavBar = () => {
    const [showNav, setShowNav] = useState<boolean>(true);
  return (
  <>
   <div className={`flex p-1 gap-1 ${showNav ? 'bg-sky-50 w-[250px]'  : ''}`}>
            <div className="p-4 rounded bg-sky-500 font-sans text-center">
          EM
            </div>
            <span className="flex justify-center  text-2xl items-center">ELITE MEDIATOR</span>
        </div>
  
  {
    showNav ? (
        <div className="h-screen w-[250px]  relative bg-sky-50">
       
<span className="flex justify-center items-center bg-sky-500 rounded-full w-5 h-5 absolute -right-2 cursor-pointer text-2xl" onClick={()=> setShowNav(!showNav)}><MdKeyboardArrowLeft />  </span>

<br />
<br />
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex gap-5 self-start px-12 hover:text-black cursor-pointer items-center text-xl">
          <span><FaRegUser /></span>
          <span className="text-sm">PROFILE</span>
        </div>

       

        <div className="flex gap-5 self-start px-12 hover:text-black cursor-pointer text-sky-500 items-center  text-xl">
          <span><RxDashboard /></span>
          <span className="text-sm">DASHBOARD</span>
        </div>

        <div className="flex gap-5 self-start px-12 hover:text-black cursor-pointer text-sky-500 items-center  text-xl">
          <span><TbUsersGroup /></span>
          <span className="text-sm">ALL USERS</span>
        </div>

        <div className="flex gap-5 self-start px-12 hover:text-black cursor-pointer text-sky-500 items-center  text-xl">
          <span><PiChatsTeardropBold /></span>
          <span className="text-sm">CHATS</span>
        </div>

        <div className="flex gap-5 self-start px-12 hover:text-black cursor-pointer text-sky-500 items-center  text-xl">
          <span><BsQrCodeScan /></span>
          <span className="text-sm">QR CODE'S</span>
        </div>

        <div className="flex gap-5 self-start px-12 hover:text-black cursor-pointer text-sky-500 items-center  text-xl">
          <span><RiLogoutBoxLine /></span>
          <span className="text-sm">LOGOUT</span>
        </div>


      </div>

      


      
    </div>
    ): (
        <div className="h-screen w-[60px]  relative bg-sky-50">
       

       <span className="flex justify-center items-center bg-sky-500 rounded-full w-5 h-5 absolute -right-2 cursor-pointer text-xs" onClick={()=> setShowNav(!showNav)}> <FaAngleRight />   </span>


<br />
<br />
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer items-center text-xl">
          <span><FaRegUser /></span>
           </div>

       

        <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center  text-xl">
          <span><RxDashboard /></span>
    
        </div>

        <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center  text-xl">
          <span><TbUsersGroup /></span>
    
        </div>

        <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center  text-xl">
          <span><PiChatsTeardropBold /></span>
         </div>

        <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center  text-xl">
          <span><BsQrCodeScan /></span>
    
        </div>

        <div className="flex gap-5 self-start px-5 hover:text-black cursor-pointer text-sky-500 items-center  text-xl">
          <span><RiLogoutBoxLine /></span>
          </div>


      </div>

      


      
    </div>
    )
  }

  </>
  )
}

export default SideNavBar
