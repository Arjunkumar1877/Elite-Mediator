import { HiOutlineUsers } from "react-icons/hi";
import Footer from "../../component/Admin/Footer";
import { IoBusiness } from "react-icons/io5";
import { Link } from "react-router-dom";
import { requestPermission } from "../../firebase/firebase";
import { useEffect, useState} from "react";
import { useSocket } from "../../contexts/AdminContext";
import axios from "axios";
import toast from "react-hot-toast";
import { TailSpin  } from 'react-loader-spinner'

type PostersDataType = {
  _id: string;
  imageUrl: string;
};

const Landing = () => {
  const { setToken }: any = useSocket();
  const url = new URLSearchParams();
  console.log(url)
  const [posters, setPosters] = useState<PostersDataType[]>([]);
  const getToken = async()=>{
   const token: string = await requestPermission();
   setToken(token)
  }
  useEffect(()=>{
  getToken();
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

  
  if(!posters){
    return(
      <div className="w-full h-screen flex flex-col justify-center items-center relative z-10 overflow-x-hidden">
       <TailSpin   
    height="80"
    width="80"
    color="#00ABE4"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
/>
    </div>
    )
  }

  console.log(posters)

  return (
    <div className="relative bg-white  overflow-hidden p-8 md:p-10 lg:p-0">
      <div className="absolute rounded-2xl top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>
      <div className="absolute rounded-2xl -top-14  sm:ml-30 md:ml-28 lg:left-64 transform translate-x-1/2 -translate-y-1/2 bg-neutral-500 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 mt-40">
        <div className="lg:w-1/2 flex flex-col space-y-4 lg:p-16">
          <h1 className="text-3xl lg:text-5xl font-bold text-zinc-600">
            DON'T MISS ANYONE
                      </h1>
          <h2 className="text-xl lg:text-2xl font-semibold text-sky-500">
            WHO TRY TO REACH YOU
          </h2>
          <p className="text-gray-600 text-sm lg:text-base">
          At Elite Mediator, we offer a revolutionary platform designed to facilitate secure and seamless communication with strangers while safeguarding your personal information.
          </p>
        <Link to={'/signup'}>
        <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded self-start">
            REGISTER
          </button>
        </Link>
        </div>


        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={ posters.length > 0 && posters[0]?.imageUrl ? posters[0]?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/1721058856452_Capture.PNG?alt=media&token=8e4ddf1c-00a3-4077-b2be-36bea2bbdb04"}
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-6 bg-white md:p-12 ">
        <div className="relative w-full">
          <div className="bg-sky-500 h-14 w-16 absolute -left-24 -top-3 rounded-xl md:h-18 md:-left-28 md:h-20  md:-top-5 lg:-left-20"></div>
          <h2 className="text-2xl font-bold text-zinc-600 text-center md:text-4xl">
            BE ALWAYS AVAILABLE FOR EVERYONE
          </h2>
        </div>
        <p className="mt-2 text-center text-gray-600">
          Manage your property from anywhere in this world
        </p>

        <div className="">
          <div className="flex flex-col justify-between mt-6 space-y-6 md:flex-row md:space-y-0 md:space-x-12 md:text-sm  lg:text-lg">
            <div className="flex flex-col items-center p-10 space-y-4 text-center bg-gray-100  rounded-lg md:w-1/3">
              <div className="flex items-center justify-center w-12 h-12 bg-sky-500 rounded-2xl relative">
          <HiOutlineUsers className="text-4xl absolute -left-2 bottom-0" />

              </div>
              <h3 className="text-xl font-semibold">Domestic</h3>
              <p className="text-gray-600">
              Domestic users can create their own unique property QR codes to facilitate communication with strangers while they are away from home. This feature allows users to interact with others through video calls, audio calls, or text messages without having to share personal information. It’s a secure way to stay connected and manage communications from a distance, ensuring your privacy is always maintained.
              </p>
            </div>

            <div className="flex flex-col items-center p-10 space-y-4 text-center bg-gray-100 rounded-lg md:w-1/3">
              <div className="flex items-center justify-center w-12 h-12 bg-sky-500 rounded-2xl relative">
              <IoBusiness className="text-4xl absolute -left-2 bottom-0" />
              </div>
              <h3 className="text-xl font-semibold">Business</h3>
              <p className="text-gray-600">
              You can generate unique property QR codes for your business, whether for selling, renting, or offering services. These QR codes let users contact you directly through video calls, audio calls, or text messages without sharing personal phone numbers, helping you manage and grow your business while maintaining privac
              </p>
            </div>
          </div>

          <div className="flex justify-center p-2 md:p-0 lg:p-0">
           <Link to={'/service'}>
           <button className="mt-auto px-4 h-11 font-semibold text-white bg-sky-500 rounded  hover:bg-sky-600 ">
              SERVICES
            </button>
           </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="">
          <img
            src={posters.length > 0 && posters[0]?.imageUrl  ?  posters[1]?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/1721057073374_landingpage2.png?alt=media&token=ad06005d-e2de-4981-8c44-dc3016d7caa9"}
            alt=""
            className="h-auto w-90 md:h-72 md:60"
          />
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div className="relative w-full mt-7">
            <div className="bg-sky-500 h-14 w-16 absolute -right-24 -top-3 rounded-xl md:h-18 md:-right-16 md:h-20  md:top-0 lg:-right-7"></div>
            <h2 className="text-xl font-bold text-zinc-600 md:text-4xl text-start">
              CONNECT WITH ANYONE SEAMLESSLY
            </h2>
            <h2 className="text-xl font-semibold text-sky-500 md:text-4xl text-start">
              KEEPING YOUR DATA'S PRIVATE
            </h2>
          </div>
          <div className="h-40 w-[900px] pr-40">
            <p className="">
            Elite Mediator offers flexible communication settings to suit your preferences. You can decide whether or not to enable video calls for users scanning your QR code. If you choose to disable video calls, users will only be able to communicate via text or audio. This level of control ensures that your communication preferences are respected while still providing various ways to interact with others.
            </p>
          </div>
          <div className="text-start">
            <button className="bg-sky-500 text-white px-4 py-2 rounded-md self-start">
              Leran more..
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-xl items-center justify-center gap-8  lg:justify-between mt-9 lg:flex-row bg-zinc-300 h-[400px]">
        <div className="relative w-1/2">
          <div className="bg-sky-500 h-14 w-16 absolute -left-44 top-9 rounded-xl sm:-left-80 md:h-18 md:-left-60 md:h-20  md:-top-2 lg:-left-8"></div>


          <div className="flex flex-col lg:w-[700px] justify-center mt-12 text-center md:text-start md:mt-0">

            <h2 className="text-xl mt-70 font-bold text-zinc-600 text-center lg:text-4xl ">
              YOUR VIRITUAL DOORMAN
            </h2>
            <h2 className="text-center w-full text-sm font-bold text-sky-500 ml-5  lg:text-2xl lg:ml-8 self-start ">
              CONNECT WTH VISITORS FROM ANYWHERE
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16 w-1/2 p-6 ">
          <HiOutlineUsers className="text-3xl lg:text-5xl text-slate-500" />
          <HiOutlineUsers className="text-3xl lg:text-5xl text-slate-500" />
          <HiOutlineUsers className="text-3xl lg:text-5xl text-slate-500" />
          <HiOutlineUsers className="text-3xl lg:text-5xl text-slate-500" />
        </div>
      </div>

      <div className="mt-8 mb-32 flex flex-col lg:flex-row lg:justify-between">
        <div className="">
          <img
            src={posters.length > 0 && posters[0]?.imageUrl ? posters[2]?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/1721057084411_landingpage3.png?alt=media&token=91cb7b6e-3c32-4f9f-b07b-7094f1fb4869"}
            alt=""
            className="h-auto w-90 md:h-72 md:60"
          />
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div className="relative w-full mt-7">
            <div className="bg-sky-500 h-14 w-16 absolute -right-24 -top-3 rounded-xl md:h-18 md:-right-16 md:h-20  md:top-0 lg:-right-7"></div>
            <h2 className="text-xl font-bold text-zinc-600 md:text-4xl text-start">
              WE MAKE YOUR DATA SAFE AND SECURE
            </h2>
            <h2 className="text-xl font-semibold text-sky-500 md:text-4xl text-start">
              YOUR PRIVACY IS OUT TOP CONCER
            </h2>
          </div>
          <div className="h-40 w-[900px] pr-40">
            <p className="">
            Security is our top priority at Elite Mediator. We ensure that all your private data is protected with state-of-the-art security measures. Our platform provides a safe environment for all communications, so you can confidently interact with strangers without worrying about your personal information being compromised.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-11 items-center justify-center p-6 bg-white md:p-12 ">
        <div className="relative w-full mb-9">
          <div className="bg-sky-500 h-14 w-16 absolute -left-24 -top-3 rounded-xl md:h-18 md:-left-20 md:h-20  md:-top-5"></div>
          <h2 className="text-2xl font-bold text-zinc-600 text-center md:text-4xl">
            STAY IN THE LOOP: VISITOR COMMUNICATION MADE EASY
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className=" bg-blue-100 rounded-xl md:w-90 md:h-72 overflow-hidden">
            <img
              src={posters.length > 0 && posters[0]?.imageUrl ? posters[3]?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/1721057095865_landingPageImg1.avif?alt=media&token=ded48002-ad32-4146-ac94-7390cbb472d2"}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>

          <div className=" bg-blue-100 rounded-xl  md:w-90 md:h-72 ">
            <h2 className="py-24 px-7 text-2xl font-bold text-slate-600 uppercase">
              Welcome All the Guests, No matter where you are
            </h2>
          </div>

          <div className=" bg-blue-100 rounded-xl md:w-90 md:h-72 overflow-hidden">
            <img
               src={posters.length > 0 && posters[0]?.imageUrl ? posters[4]?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/1721057116338_landingPageImg2.avif?alt=media&token=315fa014-7816-4406-85a3-d1c46e1ad53a"}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>

          <div className=" bg-blue-100 rounded-xl  md:w-90 md:h-72 ">
            <h2 className="py-24 px-7 text-2xl font-bold text-slate-600 uppercase">
              Peace of Mind: Chat with Visitors Even When You're Out
            </h2>
          </div>

          <div className=" bg-blue-100 rounded-xl md:w-90 md:h-72 overflow-hidden">
            <img
               src={posters.length > 0 && posters[0]?.imageUrl ? posters[5]?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/1721057130775_landingPageImg3.avif?alt=media&token=e6b97baa-1d3b-4b6d-b961-d93f66388d25"}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>

          <div className=" bg-blue-100 rounded-xl  md:w-90 md:h-72 ">
            <h2 className="py-24 px-7 text-2xl font-bold text-slate-600 uppercase">
              Have a live interaction with the visitors keeping your privacy
              ahead
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-10 mb-10">
        <h1 className="mt-2 text-sm md:mt-8  md:text-5xl font-bold text-slate-600">SMART VISITORS MANAGMENT CONNECT FROM</h1>
        <h1 className="mt-2 text-sm md:mt-8  md:text-5xl font-semibold text-sky-500">ANYWHERE</h1>

        <button className="mt-8 bg-sky-500  text-white px-4 py-2  rounded self-center">
           <Link to={'/signup'}>
           REGISTER                                           
           </Link>
          </button>
      </div>

      <Footer />

    </div>
  );
};

export default Landing;
