import React, { useState, useEffect, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const EmailOtpVerify : React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [seconds, setSeconds] = useState(30);
  const [adminData, setAdminData] = useState<any>({});
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const phone = query.get('phone');
  const reset = query.get('reset');

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/unverified_admin/${phone}`);
        if (res.ok) {
          const data = await res.json();
          setAdminData(data);
        } else {
          console.log('Error fetching user data:', res.status);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

 

  const handleChange = (element: HTMLInputElement, index: number) => {
  

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleResendOtp =  async()=>{
    try {
      const res = await axios.get(`/api/send_email_otp?id=${adminData._id}`)
    
      if(res.data.success){
        setAdminData(res.data.data);
       toast("Otp sucessfully shared to the email..");
      }else{
        toast("Email sending failed.")
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('').toUpperCase();
  
    if (enteredOtp === adminData.firebaseConfirm) {
   
    if(reset === 'true'){
      toast("You have been successfully verified. You can add your new password.");
      navigate(`/forgot_password_page?phone=${adminData.phone}`);
    }else{
      toast("You have been successfully verified. You can log in using your credentials.");
      navigate("/login");
    }
    } else {
      toast("The OTP entered is incorrect. Please enter the correct OTP or resend it.");
    }
  };
  
  

  console.log(adminData)


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src="https://firebasestorage.googleapis.com/v0/b/elite-mediator.appspot.com/o/360_F_523692923_hxuZgDZr6uzJx6yVvNjOGfgVnQVXrKad.jpg?alt=media&token=f218a4b5-325b-45bb-9ff6-b66d056c74b6" alt="OTP Icon" className="w-50 h-60 object-cover" />
        </div>
        <h2 className="text-center text-lg font-semibold mb-4">Enter the OTP sent to your mobile</h2>
        <div className="flex justify-center mb-4 space-x-2">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              maxLength={1}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              value={data}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <button onClick={handleVerifyOtp} className="w-full py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition duration-300">Verify</button>
        <div className="mt-4 flex justify-center">
          <button disabled={seconds !== 0} onClick={handleResendOtp} className="text-sky-500 underline">{seconds === 0 ? 'Resend OTP' : `Resend OTP in ${seconds} seconds`}</button>
        </div>
      </div>
    </div>
  );
};

export default EmailOtpVerify ;
