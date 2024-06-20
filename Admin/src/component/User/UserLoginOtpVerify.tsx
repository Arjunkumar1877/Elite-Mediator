import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, signInSuccess } from "../../redux/user/UserSlice";
import axios from "axios";

type UserDataType = {
  _id?: string;
  userId: string;
  adminId: string;
  propId: string;
  username: string;
  purpose: string;
  phone: number;
  firebaseCode?: string;
  verified: boolean;
  conversationId?: string;
};

const UserLoginOtpVerify = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [seconds, setSeconds] = useState(30);
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  


  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/user/get_user_by_id/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          console.log("Error fetching user data:", res.status);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [params.id]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleResendOtp = async () => {
    setSeconds(60);
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        "+91" + userData?.phone,
        recaptchaVerifier
      );
      if (confirmationResult) {
        console.log(confirmationResult)
        const res = await fetch("/user/user_update_firebase_verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firebaseConfirm: confirmationResult.verificationId,
            phone: userData?.phone,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
          toast("OTP resended successfully");
        } else {
          console.log("Error updating firebase verification:", res.status);
        }
      } else {
        console.log("Error confirming the captcha.");
      }
    } catch (error) {
      console.log("Error resending OTP:", error);
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    const verificationId = userData?.firebaseCode;
    console.log(verificationId);
  
    if (!verificationId) {
      console.log("Verification ID is missing.");
      return;
    }
  
    try {
      const credential = PhoneAuthProvider.credential(verificationId, enteredOtp);
      const verifyResult = await signInWithCredential(auth, credential);
      console.log('Verification result:', verifyResult);

      toast("OTP verification successful!");
  
      // Proceed with user verification update

      if(verifyResult){
        try {
          if (!userData?._id) {
            console.log("User ID is missing.");
            return;
          }
    
          const res = await fetch(`/user/user_update_verify/${userData._id}`, {
            method: "POST",
          });
    
          if (res.ok) {
            const data = await res.json();
            setUserData(data);
            console.log("Verification update response data:", data);
    
            if (data) {
              dispatch(signInSuccess(data));
              try {
                const response = await axios.post("/user/start_conversation", {
                  userId: data._id,
                  adminId: data.adminId,
                  propertyId: data.propId,
                });
    
                if (response.data) {
                  console.log("Conversation created:", response.data);
                  toast("OTP verification successful!");
                  dispatch(signInSuccess(response.data.user));
                  navigate(`/chat_user?conId=${response.data.user.conversationId}`);
                }
              } catch (error) {
                console.error("Error starting conversation:", error);
              }
            } else if (data?.conversationId) {
              dispatch(signInSuccess(data));
              navigate(`/chat_user?conId=${data.conversationId}`);
            }
          } else {
            const errorText = await res.text();
            console.log("Error updating verification status:", res.statusText, errorText);
            toast("Error updating verification status");
          }
        } catch (error) {
          console.log("Error during verification update:", error);
          toast("Error during verification update");
        }
    
      }


  
    } catch (error: any) {
      console.log("Error verifying OTP:", error);
      if (error.code === "auth/code-expired") {
        toast("The OTP has expired. Please request a new one.");
        // Optionally trigger a new OTP request here
      } else if (error.code === "auth/invalid-verification-code") {
        toast("The OTP entered is invalid. Please try again.");
      } else {
        toast("Error verifying OTP. Please try again.");
      }
    }
  };
  
  // // Example function to request a new OTP (if needed)
  // const requestNewOtp = async () => {
  //   try {
  //     const phoneNumber = userData?.phoneNumber; // Assuming phoneNumber is available in userData
  //     if (!phoneNumber) {
  //       throw new Error("Phone number is missing.");
  //     }
  //     const appVerifier = window.recaptchaVerifier; // Assuming reCAPTCHA verifier is set up
  //     const verificationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  //     userData.firebaseCode = verificationResult.verificationId;
  //     toast("A new OTP has been sent to your phone.");
  //   } catch (error) {
  //     console.log("Error requesting new OTP:", error);
  //     toast("Error requesting new OTP. Please try again.");
  //   }
  // };
  



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img
            src="/public/otpverify.jpg"
            alt="OTP Icon"
            className="w-50 h-60 object-cover"
          />
        </div>
        <h2 className="text-center text-lg font-semibold mb-4">
          Enter the OTP sent to your mobile
        </h2>
        <div className="flex justify-center mb-4 space-x-2">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              maxLength={1}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              value={data}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target, index)
              }
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <button
          onClick={handleVerifyOtp}
          className="w-full py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition duration-300"
        >
          Verify
        </button>
        <div className="mt-4 flex justify-center">
          <button
            disabled={seconds !== 0}
            onClick={handleResendOtp}
            className="text-sky-500 underline"
          >
            {seconds === 0 ? "Resend OTP" : `Resend OTP in ${seconds} seconds`}
          </button>
        </div>
        <div id="recaptcha"></div>
      </div>
    </div>
  );
};

export default UserLoginOtpVerify;
