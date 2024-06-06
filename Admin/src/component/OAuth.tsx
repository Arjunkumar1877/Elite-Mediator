import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInSuccess } from "../redux/user/userSlice";
import { FcGoogle } from "react-icons/fc";

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
        console.log(data);
        dispatch(signInSuccess(data));
        navigate("/admin-data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogleClick}
        className="relative bg-zinc-300 w-full rounded py-1 px-5 text-slate-600 hover:bg-zinc-400"
      >
        <FcGoogle className="absolute left-2 top-2" />
        Google
      </button>
    </div>
  );
};

export default OAuth;
