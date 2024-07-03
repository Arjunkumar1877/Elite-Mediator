import { useState } from "react";
import SideNavBar from "../../pages/Admin/SideNavBar";
import UsersListSection from "../../pages/Admin/UsersListSection";

const UsersListPage = () => {
    
    const [navShow, setNavShow] = useState<boolean>(true);
    return (
      <div className="flex w-screen">
      <SideNavBar navShowSet={setNavShow} />
      <div className={`transition-all duration-300 ${!navShow ? "w-[60px]" : "w-[250px]"}`}></div>
      <div className="flex-1">
      <UsersListSection />
      </div>
    </div>
    )
  }

export default UsersListPage
