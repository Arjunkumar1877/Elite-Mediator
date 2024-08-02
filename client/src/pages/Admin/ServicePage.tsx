import { Link } from "react-router-dom";
import Footer from "../../component/Admin/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type PostersDataType = {
  _id: string;
  imageUrl: string;
};
const ServicePage = () => {
  const [posters, setPosters] = useState<PostersDataType[]>([]);
  useEffect(()=>{
    handleFetchPosters();
    },[])
  
    const handleFetchPosters = async () => {
      try {
        const response = await axios.get('/superAdmin/get_posters');
        setPosters(response.data);
      } catch (error) {
        console.log(error);
        toast("Failed to fetch posters.");
      }
    };
  return (
    <div className="relative bg-white  overflow-hidden p-8 md:p-10 lg:p-0">
      <div className="absolute rounded-2xl top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>
      <div className="absolute rounded-2xl -top-14  sm:ml-30 md:ml-28 lg:left-64 transform translate-x-1/2 -translate-y-1/2 bg-neutral-500 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>

      <div className="relative mb-10 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 mt-40">
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={posters.length > 0 ? posters[6].imageUrl : 'https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/1721057219908_Domestic.jpg?alt=media&token=8ba48abf-8c4e-432b-a892-f42d86190fa2'}
            alt="Illustration"
            className="max-w-full mt-10 h-auto"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col space-y-4 lg:p-16">
         <Link to={'/signup'}>
         <button className="bg-sky-500 text-white px-4 py-2 rounded self-end">
            Register now
          </button>
         </Link>
          <h1 className="text-3xl lg:text-5xl font-bold text-zinc-600">
            DOMESTIC
          </h1>
          <p className=" text-zinc-700 text-sm  lg:text-lg z-20">
          For domestic users, Elite Mediator offers a convenient way to stay connected without sharing private information. By creating unique QR codes, users can communicate with strangers safely, whether they're away from home or managing personal interactions. The app allows for real-time communication via video calls, audio calls, or text messages, providing a secure and private channel for interaction. 
          </p>
          <p className="text-slate-300 text-sm lg:text-lg z-20">
          The flexibility to choose between verified, unverified, or unknown user statuses ensures that you can control the level of access and verification required for each interaction. With push notifications, PWA compatibility, and comprehensive visitor management features, Elite Mediator seamlessly integrates into your daily life, offering a reliable and secure means of communication while safeguarding your personal data.
          </p>
          <div className="absolute rounded-2xl -right-20 -bottom-32  sm:ml-30 md:ml-28  transform translate-x-1/2 -translate-y-1/2 bg-sky-500 w-40 h-40 md:-right-20 md:-bottom-20 lg:w-72 lg:h-60 rotate-45 lg:-bottom-40 lg:-right-6"></div>
        </div>
      </div>

      <div className="flex flex-col gap-8 justify-between lg:flex-row lg:p-10">
        <div className="w-1/2">
          <div className="relative">
            <div className="bg-sky-500 h-14 w-16 absolute -left-16 -top-3 rounded-xl md:h-18 md:-left-16 md:h-20  md:-top-4"></div>

            <div className="pl-5">
              <h1 className="text-3xl lg:text-5xl font-bold text-zinc-600 uppercase">
                Business
              </h1>
              <p className="w-[800px] text-sm mt-5  text-zinc-700 lg:text-lg">
              Elite Mediator is a cutting-edge communication platform designed to connect users with strangers securely and efficiently. Whether you're in business or managing personal interactions, our app provides an innovative solution to maintain privacy while facilitating communication. Businesses can generate unique property QR codes for various purposes, such as selling, renting, or offering services. These QR codes enable potential clients to reach out through video calls, audio calls, or text messages without disclosing personal phone numbers. The app supports the inclusion of property names, addresses, and customizable verification options, ensuring that your business interactions remain professional and secure. With options to control video call permissions and filter chat interactions based on user verification status, Elite Mediator enhances your ability to manage and grow your business while preserving your privacy.
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex justify-center items-center ml-14">
          <img src={posters.length > 0 ? posters[7].imageUrl : "https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/1721057233070_Bussiness.jpg?alt=media&token=e378a80b-11bc-473d-888e-9c91419e74c2"} alt="" className="" />
        </div>
      </div>

      <div className="mt-16  mb-32 flex flex-col gap-5 lg:flex-row lg:justify-between">
        <div className="">
          <img src={posters.length > 0 ? posters[8].imageUrl : "https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/1721057243593_visitors.webp?alt=media&token=7bd7a863-f40f-4c4e-9272-8172284648fc"} alt="" />
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div className="relative w-full mt-7">
            <div className="bg-sky-500 h-14 w-16 absolute -right-16 -top-3 rounded-xl md:h-18 lg:-right-7 md:h-20  md:-top-7 "></div>
            <h2 className="text-xl font-bold text-zinc-600 md:text-4xl text-start uppercase">
              Ensure your visitor leave happy
            </h2>
          </div>
          <div className="h-40 w-[600px] lg:w-[900px] pr-40 mr-10">
            <p className="pr-10 text-sm text-zinc-700 lg:text-lg">
            Our platform features robust visitor management tools that allow property owners to filter and manage interactions effectively. You can sort visitors by date, property, or time to streamline communication and follow up with leads efficiently. Additionally, the app provides direct contact options, including mobile numbers and WhatsApp integration, so you can easily reach out to verified or unverified visitors based on the information they provided.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServicePage;



