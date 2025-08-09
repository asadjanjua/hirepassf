import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setForgotPasswordEmail } from '../store/slices/authSlice';

const ForgotPass = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    dispatch(setForgotPasswordEmail(email));

    console.log('Forgot password email set:', email);
    // Navigate to OTP/verification step here if needed
     if (onSuccess) onSuccess();
  };

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-600 mt-2">
            Please enter your email to get a verification code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email"
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                error
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition font-medium"
          >
            Submit
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPass;
