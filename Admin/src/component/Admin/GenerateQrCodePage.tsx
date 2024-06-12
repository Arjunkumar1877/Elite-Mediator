import { useState } from "react";
import SideNavBar from "../../pages/Admin/SideNavBar"
import QrCodeGenerateSection from "../../pages/Admin/QrCodeGenerateSection";

const GenerateQrCodePage = () => {
    
  const [navShow, setNavShow] = useState<boolean>(true);
  return (
    <div className="flex w-screen">
    <SideNavBar navShowSet={setNavShow} />
    <div className={`transition-all duration-300 ${!navShow ? "w-[60px]" : "w-[250px]"}`}></div>
    <div className="flex-1">
    <QrCodeGenerateSection />
    </div>
  </div>
  )
}

export default GenerateQrCodePage
