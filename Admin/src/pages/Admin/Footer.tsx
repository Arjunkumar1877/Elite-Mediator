import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";
import { CiYoutube, CiLinkedin } from "react-icons/ci";
import { RxTwitterLogo } from "react-icons/rx";



const Footer = () => {
  return (
    <div className="grid grid-cols-1  pt-16 pb-20 md:grid-cols-3 mt-10 md:pb-40 bg-slate-800 md:h-72  text-white lg:gap-10">
     <div className="flex flex-col justify-center items-center px-11 gap-5">
        <h2 className="self-start md:text-sm lg:text-2xl">Company</h2>
        <span className="self-start md:text-xs ">About Us</span>
        <span className="self-start md:text-xs ">Blog</span>
        <span className="self-start md:text-xs ">Contact Us</span>
        <span className="self-start md:text-xs ">Testamonials</span>
     </div>
   
     <div className="flex flex-col justify-center items-center px-11 gap-5">
        <h2 className="self-start md:text-sm lg:text-2xl">Support</h2>
        <span className="self-start md:text-xs ">Help Center</span>
        <span className="self-start md:text-xs ">Terms and Services</span>
        <span className="self-start md:text-xs ">Legal</span>
        <span className="self-start md:text-xs ">Privacy Policy</span>
     </div>

     <div className="flex flex-col justify-center items-center px-11 gap-5">
        <h2 className="self-start text-sm lg:text-2xl">Stay up to date</h2>
        <div className="self-start flex gap-1">
          <input type="email" placeholder="Your email address" className="rounded-md w-28 h-8 px-1 py-1 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 lg:w-40"  />
          <button className="bg-sky-500 w-16 text-xs text-white px-1 py-1 rounded-md hover:bg-blue-700">
            Subscribe
          </button>
        </div>
        <span className="self-start flex gap-5 text-lg ">
            <RiFacebookBoxLine />
          <FaInstagram />
          <CiYoutube />
          <CiLinkedin />
          <RxTwitterLogo />
        </span>
        <span className="self-start text-slate-400 text-sm lg:text-lg ">copyright @ 2024</span>
        <span className="self-start text-slate-400 text-sm lg:text-lg">Powered by Elite Mediator pvt ltd</span>
     </div>

     
    </div>
  )
}

export default Footer
