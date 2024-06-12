import { useState } from "react";
import SideNavBar from "../../pages/Admin/SideNavBar"
import QrCodesSection from "../../pages/Admin/QrCodesSection";

const QrCodesPage = () => {
    
  const [navShow, setNavShow] = useState<boolean>(true);
  return (
    <div className="flex w-screen">
    <SideNavBar navShowSet={setNavShow} />
    <div className={`transition-all duration-300 ${!navShow ? "w-[60px]" : "w-[250px]"}`}></div>
    <div className="flex-1">
    <QrCodesSection />
    </div>
  </div>
  )
}

export default QrCodesPage
