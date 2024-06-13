import { useState } from "react";
import SideNavBar from "../../pages/Admin/SideNavBar";
import AdminChatSection from "../../pages/Admin/AdminChatSection";

const AdminChatPage = () => {
    
    const [navShow, setNavShow] = useState<boolean>(true);
    return (
      <div className="flex w-screen">
     <div className="hidden md:block">
     <SideNavBar navShowSet={setNavShow}  />
     </div>
      <div className={`hidden md:block transition-all duration-300 ${!navShow ? "w-[60px]" : "w-[250px]"}`}></div>
      <div className="flex-1">
      <AdminChatSection />
      </div>
    </div>
    )
  }

export default AdminChatPage
