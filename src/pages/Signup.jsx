import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignupStep1 from '../components/SignupStep1';
import SignupStep2 from '../components/SignupStep2';
import CustomPic from '../components/CustomPic';

const Signup = () => {
  const navigate = useNavigate();
  const currentStep = useSelector((state) => state.signup.currentStep);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT: Signup form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 lg:px-20 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="text-gray-600 mt-2">
            Join <span className="font-semibold text-emerald-600">HirePass</span> and start your journey.
          </p>
        </div>
        {currentStep === 1 && <SignupStep1 />}
        {currentStep === 2 && <SignupStep2 />}
      </div>

      {/* RIGHT: Illustration */}
      <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center p-8">
        <CustomPic />
      </div>
    </div>
  );
};

export default Signup;
