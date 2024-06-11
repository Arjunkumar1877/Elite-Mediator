import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInSuccess } from "../redux/user/userSlice";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
      const res = await fetch("/api/google_oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          image: resultsFromGoogle.user.photoURL,
          phone: 910000000000,
          password: "12345678",
        }),
      });

      const data = await res.json();
      if (res.ok) {
      if(data?.address){
        console.log(data);
        dispatch(signInSuccess(data));
        navigate("/profile");
        toast("Succesfully logged In")
      }else{
        console.log(data);
        dispatch(signInSuccess(data));
        navigate("/admin-data");
        toast("Succesfully logged In")

      }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center">
    <button
      onClick={handleGoogleClick}
      className="relative flex items-center justify-center bg-white w-full max-w-sm rounded-full py-2 px-4 text-gray-600 hover:bg-gray-100 hover:shadow-md transition duration-300 ease-in-out border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <FcGoogle className="w-6 h-6 mr-3" />
      <span className="font-medium">Sign in with Google</span>
    </button>
  </div>
  );
};

export default OAuth;


// <div>
// <button
//   onClick={handleGoogleClick}
//   className="relative bg-zinc-300 w-full rounded py-1 px-5 text-slate-600 hover:bg-zinc-400"
// >
//   <FcGoogle className="absolute left-2 top-2" />
//   Google
// </button>
// </div>