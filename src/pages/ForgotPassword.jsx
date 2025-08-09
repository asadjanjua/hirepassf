import React, { useState } from 'react';
import ForgotPass from '../components/ForgotPass';
import OTP from '../components/OTP';
import NewPassword from '../components/NewPassword';
import { useSelector } from 'react-redux';
import CustomPic from '../components/CustomPic';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1 = email, 2 = OTP, 3 = new password
  const forgotPasswordEmail = useSelector(
    (state) => state.auth.forgotPasswordEmail
  );

  const handleEmailSubmitted = () => setStep(2);
  const handleOtpVerified = () => setStep(3);

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT: Forms */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 lg:px-20 py-12">
        {step === 1 && <ForgotPass onSuccess={handleEmailSubmitted} />}
        {step === 2 && <OTP email={forgotPasswordEmail} onSuccess={handleOtpVerified} />}
        {step === 3 && <NewPassword email={forgotPasswordEmail} />}
      </div>

      {/* RIGHT: Illustration */}
      <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center p-8">
        <CustomPic />
      </div>
    </div>
  );
};

export default ForgotPassword;
