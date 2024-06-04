import React, { useState, ChangeEvent } from 'react';

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  console.log(otp)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src="public/otpverify.jpg" alt="OTP Icon" className="w-50 h-60 object-cover" />
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
        <button onClick={()=> console.log(otp)} className="w-full py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition duration-300">Verify</button>
      </div>
    </div>
  );
};

export default OtpVerification;
