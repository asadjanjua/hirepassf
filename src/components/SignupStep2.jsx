import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupStep2 } from '../store/thunks/signupThunks';
import { setError, clearError } from '../store/slices/errorSlice';
import { setCurrentStep } from '../store/slices/signupSlice';

export default function SignupStep2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.error.errors);
  const loading = useSelector((state) => state.error.loading);

  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');

  const step1 = useSelector((state) => state.signup.step1Data);

  const validateStep2 = () => {
    let valid = true;

    if (!fullName.trim()) {
      dispatch(setError({ field: 'fullName', message: 'Full name is required' }));
      valid = false;
    } else {
      dispatch(clearError('fullName'));
    }

    if (!phoneNumber.trim()) {
      dispatch(setError({ field: 'phoneNumber', message: 'Phone number is required' }));
      valid = false;
    } else {
      dispatch(clearError('phoneNumber'));
    }

    if (!dob) {
      dispatch(setError({ field: 'dob', message: 'Date of birth is required' }));
      valid = false;
    } else {
      dispatch(clearError('dob'));
    }

    return valid;
  };

  const handleBack = () => {
    dispatch(setCurrentStep(1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    const signupData = {
      ...step1,
      fullName,
      phone: `${countryCode}${phoneNumber}`,
      dob,
    };

    dispatch(signupStep2(signupData)).catch(() => {});
  };

  return (
    <div className="flex w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-600 mt-2">Please enter your personal details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Full Name */}
        <div>
          <div className="relative">
            <img
              src="/user.svg"
              alt="User Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) dispatch(clearError('fullName'));
              }}
              className="w-full border border-gray-300 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          {errors.fullName && <p className="text-red-500 mt-1 text-sm">{errors.fullName}</p>}
        </div>

        {/* Phone with Country Code */}
        <div>
          <div className="flex space-x-2">
            <div className="relative w-28">
              <img
                src="/country.svg"
                alt="Country Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full border border-gray-300 rounded px-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
              </select>
            </div>
            <input
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (errors.phoneNumber) dispatch(clearError('phoneNumber'));
              }}
              className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          {errors.phoneNumber && <p className="text-red-500 mt-1 text-sm">{errors.phoneNumber}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <input
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              if (errors.dob) dispatch(clearError('dob'));
            }}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors.dob && <p className="text-red-500 mt-1 text-sm">{errors.dob}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition font-medium"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading.step2}
            className={`px-6 py-2 text-white rounded transition font-medium ${
              loading.step2
                ? 'bg-gray-400'
                : 'bg-emerald-500 hover:bg-emerald-600'
            } disabled:opacity-50`}
          >
            {loading.step2 ? 'Submitting...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}
