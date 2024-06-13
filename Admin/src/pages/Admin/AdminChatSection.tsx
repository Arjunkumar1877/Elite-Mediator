import { MdArrowBackIosNew } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlinePaperClip } from "react-icons/hi2";
import { BsSend } from "react-icons/bs";
import { Link } from "react-router-dom";

const AdminChatSection = () => {
  return (
    <div className="pt-16 h-screen bg-gray-50 flex flex-col">
      <div className="border-2 flex flex-col h-full p-4 bg-white shadow-lg">
        <div className="flex justify-between items-center px-5 py-2 border-b-2">
          <div className="flex gap-5 items-center">
            <Link to={'/chat_list'}>
            <MdArrowBackIosNew className="text-xl cursor-pointer" />
            </Link>
            <img src="/public/userIcon.webp" className="w-10 h-10 rounded-full" alt="User" />
            <span className="text-xl font-bold">Arjun Kumar VS</span>
          </div>
          <div className="flex gap-5 items-center text-2xl text-sky-500">
            <IoCall className="cursor-pointer" />
            <FaVideo className="cursor-pointer" />
            <HiDotsVertical className="cursor-pointer" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-col gap-4 px-5">
            <div className="flex justify-start gap-3">
              <img src="/public/userIcon.webp" alt="User" className="w-10 h-10 rounded-full" />
              <div className="flex flex-col">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>12:36 AM</span>
                  <span>Amal</span>
                </div>
                <div className="p-3 rounded-xl bg-sky-100 text-sm max-w-xs">
                  Hai, how are you my friend
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <div className="flex flex-col items-end">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Amal</span>
                  <span>12:36 AM</span>
                </div>
                <div className="p-3 rounded-xl bg-sky-100 text-sm max-w-xs">
                  Hai, how are you my friend. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio deleniti in labore, veniam temporibus architecto eaque doloribus corrupti maiores neque. Asperiores eligendi eos velit commodi autem illum dolorum temporibus in, fugiat, unde sint dolore necessitatibus vero molestias iusto eum animi cumque natus nulla omnis quasi.
                </div>
              </div>
              <img src="/public/userIcon.webp" alt="User" className="w-10 h-10 rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center px-5 py-2 bg-sky-200 rounded-lg mt-2">
          <img src="/public/userIcon.webp" className="w-10 h-10 rounded-full" alt="User" />
          <input
            type="text"
            placeholder="Write something..."
            className="flex-1 mx-3 p-2 rounded-lg border bg-sky-100 border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <HiOutlinePaperClip className="text-sky-500 text-2xl cursor-pointer" />
          <div className="p-2 rounded-full bg-sky-500 ml-3 cursor-pointer">
            <BsSend className="text-white text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatSection;
