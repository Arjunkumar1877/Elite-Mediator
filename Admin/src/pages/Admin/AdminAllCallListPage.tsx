import { useState } from "react";
import SideNavBar from "../../component/Admin/SideNavBar";
import  { Suspense, lazy } from 'react';
import ReactLoading from "react-loading";

const AdminAllCallListSection = lazy(() => import('../../component/Admin/AdminAllCallListSection'));


const AdminAllCallListPage = () => {
  const [navShow, setNavShow] = useState<boolean>(true);

  return (
    <div className="flex w-screen">
      <SideNavBar navShowSet={setNavShow} />
      <div className={`transition-all duration-300 ${!navShow ? "w-[60px]" : "w-[250px]"}`}></div>
      <div className="flex-1">
        
      <Suspense fallback={<div className="flex justify-center items-center h-full">
      <ReactLoading type={"spin"} color={"#000"} />
    </div>}>
        <AdminAllCallListSection />
      </Suspense>
      </div>
    </div>
  );
};

export default AdminAllCallListPage;
