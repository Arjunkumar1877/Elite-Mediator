import { FaUserAlt } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";
import { HiSpeakerXMark } from "react-icons/hi2";
import { IoIosMicOff } from "react-icons/io";
import { IoIosMic } from "react-icons/io";

const CallPage = () => {
  return (
    <div>
      {/* <div className="flex flex-col gap-y-16 p-9">
             <div className="flex flex-col gap-5 mb-10">
             <div className="flex justify-center">
                <h3>Incomming call</h3>
              </div>

              <div className="flex justify-center">
                <div className="w-48 h-48 bg-sky-500 rounded-full flex justify-center items-center">
              <FaUserAlt className="text-white text-9xl p-2" />
                </div>
              </div>

           <div className="flex justify-center">
            <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-sky-500">Arjun kumar vs</h2>
            <p className="text-zinc-400 text-center font-semibold">Visitor</p>
            </div>
           </div>
             </div>

            
             <div className="flex justify-between px-16">
              <button className="flex justify-center items-center w-24 h-24 bg-green-400 rounded-full">
              <MdCall className="text-white text-7xl" />
              </button>
              <button className=" flex justify-center items-center  w-24 h-24 bg-red-400 rounded-full">
            <MdCallEnd className="text-white text-7xl" />
</button>
             </div>
    
      </div> */}

      <div className="flex flex-col gap-y-16 p-9">
        <div className="flex flex-col gap-5 mb-10">
          <div className="flex justify-center">
            <h3>Connected</h3>
          </div>

          <div className="flex justify-center">
            <div className="w-52 h-52 bg-green-300 rounded-full flex justify-center items-center">
              <div className="w-48 h-48 bg-sky-500 rounded-full flex justify-center items-center">
                <FaUserAlt className="text-white text-9xl p-2" />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col">
              <h2 className="font-bold text-3xl text-sky-500">
                Arjun kumar vs
              </h2>
              <p className="text-zinc-400 text-center font-semibold">Visitor</p>
            </div>
          </div>
        </div>

       <div className="flex flex-col gap-3">
       <div className="flex justify-between px-16">
          <button className="flex justify-center items-center ">
            {/* <HiSpeakerWave className="text-zinc-500 text-6xl" /> */}
            <HiSpeakerXMark className="text-zinc-500 text-6xl" />
          </button>
          <button className=" flex justify-center items-center  ">
            {/* <IoIosMicOff className="text-zinc-500 text-6xl" /> */}
            <IoIosMic className="text-zinc-500 text-6xl" />
          </button>
        </div>

       <div className="flex justify-center">
       <button className=" flex justify-center items-center  w-20 h-20 bg-red-400 rounded-full hover:bg-red-800">
            <MdCallEnd className="text-white text-5xl" />
</button>
       </div>

       </div>
      </div>
    </div>
  );
};

export default CallPage;
