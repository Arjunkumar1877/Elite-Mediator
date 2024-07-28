import { useState } from 'react';
import SuperAdminSideNavbar from '../../component/SuperAdmin/SuperAdminSideNavbar';
import SuperAdminDashboardSection from '../../component/SuperAdmin/SuperAdminDashboardSection';

const SuperAdminDashboardPage = () => {
  const [navShow, setNavShow] = useState<boolean>(true);

  return (
    <div className="flex w-screen">
      <SuperAdminSideNavbar navShowSet={setNavShow} />
      <div className={`transition-all duration-300 ${!navShow ? "w-[60px]" : "w-[250px]"}`}></div>
      <div className="flex-1">
        <SuperAdminDashboardSection />
      </div>
    </div>
  );
};

export default SuperAdminDashboardPage