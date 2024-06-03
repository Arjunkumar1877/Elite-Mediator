import { HiOutlineUsers } from "react-icons/hi";


const Landing = () => {
    return (
      <div className="relative bg-white  overflow-hidden p-8 md:p-10 lg:p-0">
        {/* Square Design Blocks */}
        <div className="absolute rounded-2xl top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>
        <div className="absolute rounded-2xl -top-14  sm:ml-30 md:ml-28 lg:left-64 transform translate-x-1/2 -translate-y-1/2 bg-neutral-500 w-40 h-40 lg:w-72 lg:h-72 rotate-45"></div>
        




        <div className="relative flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 mt-40">
          {/* Left Section */}
          <div className="lg:w-1/2 flex flex-col space-y-4 lg:p-16">
    <h1 className="text-3xl lg:text-5xl font-bold text-zinc-600">
      DON'T MISS ANYONE
    </h1>
    <h2 className="text-xl lg:text-2xl font-semibold text-sky-500">
      WHO TRY TO REACH YOU
    </h2>
    <p className="text-gray-600 text-sm lg:text-base">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <button className="bg-sky-500 text-white px-4 py-2 rounded-lg self-start">
      SERVICES
    </button>
  </div>
  
          
          {/* Right Section */}
         
  
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
    <img src="public/Capture.PNG" alt="Illustration" className="max-w-full h-auto" />
  </div>
  
        </div>
  
  
  
  
  
  <div className="flex flex-col items-center justify-center p-6 bg-white md:p-12 ">
  <div className="relative w-full">
  <div className="bg-sky-500 h-14 w-16 absolute -left-24 -top-3 rounded-xl md:h-18 md:-left-20 md:h-20  md:-top-5"></div>
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
      <div className="flex items-center justify-center w-12 h-12 bg-sky-500 rounded-2xl">
        
      </div>
      <h3 className="text-xl font-semibold">Domestic</h3>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed adibced sit amet justo ipsum. Sed accumsan quam vitae est varius.
      </p>
    </div>
    
    <div className="flex flex-col items-center p-10 space-y-4 text-center bg-gray-100 rounded-lg md:w-1/3">
      <div className="flex items-center justify-center w-12 h-12 bg-sky-500 rounded-2xl">
        
      </div>
      <h3 className="text-xl font-semibold">Business</h3>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed adibced sit amet justo ipsum. Sed accumsan quam vitae est varius.
      </p>
    </div>
  </div>
  
  <div className="flex justify-center p-2 md:p-0 lg:p-0">
    <button className="mt-auto px-4 h-11 font-semibold text-white bg-sky-500 rounded-lg">
      SERVICES
    </button>
  </div>
  </div>
  
       
      </div>







      <div className="flex flex-col lg:flex-row lg:justify-between">
       <div className="">
        <img src="public/landingpage2.png" alt="" className="h-auto w-90 md:60" />
       </div>


       <div className="flex flex-col justify-center gap-5">
       <div className="relative w-full">
  <div className="bg-sky-500 h-14 w-16 absolute -right-24 -top-3 rounded-xl md:h-18 md:-right-16 md:h-20  md:-top-5 lg:-right-7" ></div>
        <h2 className="text-2xl font-bold text-zinc-600 md:text-4xl text-start">
          BE ALWAYS AVAILABLE FOR EVERYONE
        </h2>
  </div>
    <div className="h-40 w-[900px] pr-40">
    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eveniet labore, adipisci vitae doloremque eligendi qui magnam eaque nihil? Quasi ipsum, saepe consectetur aspernatur consequuntur numquam alias culpa, incidunt hic ad eligendi iusto repellendus accusamus voluptates amet molestias laudantium, molestiae ab earum quia minima repellat dolor. Praesentium ab vero totam!</p>
    </div>
        <div className="text-start">
        <button className="bg-sky-500 text-white px-4 py-2 rounded-md self-start">
      Leran more..
    </button>
        </div>
       </div>
      </div>




<div className="flex flex-col  justify-between items-center mt-9 md:flex-row bg-zinc-300 h-[400px]">
<div className="relative flex-1">
  <div className="bg-sky-500 h-14 w-16 absolute -left-20 -top-3 rounded-xl md:h-18 md:-left-7 md:h-20  md:-top-2"></div>
  <div className="flex flex-col w-[700px] justify-center mt-12 text-start md:mt-0">
  <h2 className="text-2xl mt-70 font-bold text-zinc-600 text-center md:text-4xl ">
          YOUR VIRITUAL DOORMAN
        </h2> 
        <h2 className=" text-center text-xs font-bold text-sky-500  md:text-2xl md:ml-24 ">
          CONNECT WTH VISITORS FROM ANNYWHERE
        </h2>
  </div>
       
  </div>

  <div className="grid grid-cols-2 gap-16 md:gap-10 flex-1">
  <HiOutlineUsers className="text-5xl"/>
  <HiOutlineUsers className="text-5xl"/>
  <HiOutlineUsers className="text-5xl"/>
  <HiOutlineUsers className="text-5xl"/>
 

  </div>
</div>





      </div>
    );
  }
  
  export default Landing;
  
  