import { useState } from "react";
import SideNavBar from "../../component/Admin/SideNavBar";
import AdminChatListSection from "../../component/Admin/AdminChatListSection";

const AdminChatListPage = () => {
    
    const [navShow, setNavShow] = useState<boolean>(true);
    return (
      <div className="flex w-screen">
      <SideNavBar navShowSet={setNavShow} />
      <div className={`transition-all duration-300 ${!navShow ? "w-[60px]" : "w-[250px]"}`}></div>
      <div className="flex-1">
      <AdminChatListSection />
      </div>
    </div>
    )
  }

export default AdminChatListPage
