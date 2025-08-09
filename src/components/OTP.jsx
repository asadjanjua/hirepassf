import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const OTP = () => {
  const forgotPasswordEmail = useSelector(
    (state) => state.auth.forgotPasswordEmail
  );

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError('OTP is required');
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError('OTP must be a 6-digit number');
      return;
    }

    setError('');
    console.log('Verifying OTP:', otp);
    // dispatch(verifyOtpThunk({ email: forgotPasswordEmail, otp }))
  };

  const handleResend = () => {
    console.log('Resending OTP to:', forgotPasswordEmail);
    // dispatch(resendOtpThunk(forgotPasswordEmail))
  };

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Enter Verification Code</h2>
          <p className="text-gray-600 mt-2">
            We sent a 6-digit code to{' '}
            <span className="font-medium text-gray-800">
              {forgotPasswordEmail || 'your email'}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* OTP Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP Code
            </label>
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, '')); // only digits
                setError('');
              }}
              placeholder="Enter 6-digit code"
              className={`w-full rounded-lg border px-4 py-2 text-center tracking-widest text-lg font-medium focus:outline-none focus:ring-2 ${
                error
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition font-medium"
          >
            Verify
          </button>
        </form>

        {/* Resend */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Didn’t receive the code?{' '}
          <button
            onClick={handleResend}
            type="button"
            className="text-blue-600 hover:underline font-medium"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTP;
