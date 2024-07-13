import { useState } from "react";
import SuperAdminSideNavbar from "../../component/SuperAdmin/SuperAdminSideNavbar";
import SuperAdminRegisteredAdminsListSection from "../../component/SuperAdmin/SuperAdminRegisteredAdminsListSection";


const SuperAdminRegisteredAdminProfilePage = () => {
    const [navShow, setNavShow] = useState<boolean>(true);

    return (
      <div className="flex w-screen">
        <SuperAdminSideNavbar navShowSet={setNavShow} />
        <div className={`transition-all duration-300 ${!navShow ? "w-[60px]" : "w-[250px]"}`}></div>
        <div className="flex-1">
          <SuperAdminRegisteredAdminsListSection />
        </div>
      </div>
    );
}

export default SuperAdminRegisteredAdminProfilePage