import { Link } from "react-router-dom";
import Footer from "../../pages/Admin/Footer";


const ServicePage = () => {
  return (
    <div className="relative bg-white  overflow-hidden p-8 md:p-10 lg:p-0">
      <div className="absolute rounded-2xl top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>
      <div className="absolute rounded-2xl -top-14  sm:ml-30 md:ml-28 lg:left-64 transform translate-x-1/2 -translate-y-1/2 bg-neutral-500 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>

      <div className="relative mb-10 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 mt-40">
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src="public/Domestic.jpg"
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
            Acting as the perfect mediator, our service helps visitors reach you
            through a generated QR code when you're not at home, ensuring a
            seamless experience while keeping your personal data private.
          </p>
          <p className="text-slate-300 text-sm lg:text-lg z-20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet
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
                Acting as the perfect mediator, our services facilitate renting
                and selling your properties seamlessly. Users can reach you
                through a generated QR code, ensuring your private phone number
                remains confidential. Enjoy a seamless experience with our app,
                designed for effortless and secure transactions.
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex justify-center items-center ml-14">
          <img src="public/Bussiness.jpg" alt="" className="" />
        </div>
      </div>

      <div className="mt-16  mb-32 flex flex-col gap-5 lg:flex-row lg:justify-between">
        <div className="">
          <img src="public/visitors.webp" alt="" />
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
              Experience a seamless user interface with our web app, offering
              integrated chat, voice call, and video call functionalities.
              Effortlessly communicate in real-time, whether you prefer texting,
              talking, or face-to-face interactions. Our platform ensures smooth
              and uninterrupted connectivity, enhancing your online
              communication experience.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServicePage;



