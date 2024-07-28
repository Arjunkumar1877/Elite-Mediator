import { useState } from 'react';
import SideNavBar from '../../component/Admin/SideNavBar';
import DashBoardSection from '../../component/Admin/DashBoardSection';

const DashboardPage = () => {
  const [navShow, setNavShow] = useState<boolean>(true);

  return (
    <div className="flex w-screen">
      <SideNavBar navShowSet={setNavShow} />
      <div className={`transition-all duration-300 ${!navShow ? "w-[60px]" : "w-[250px]"}`}></div>
      <div className="flex-1">
      <DashBoardSection />
      </div>
    </div>
  );
};

export default DashboardPage;
