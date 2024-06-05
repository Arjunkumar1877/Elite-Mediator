import { useState } from 'react';
import SideNavBar from '../pages/SideNavBar';
import ProfileSection from '../pages/ProfileSection';

const ProfilePage = () => {
  const [navShow, setNavShow] = useState<boolean>(true);

  return (
    <div className="flex w-screen">
      <SideNavBar navShowSet={setNavShow} />
      <div className={`transition-all duration-300 ${!navShow ? "w-[60px]" : "w-[250px]"}`}></div>
      <div className="flex-1">
        <ProfileSection />
      </div>
    </div>
  );
};

export default ProfilePage;
