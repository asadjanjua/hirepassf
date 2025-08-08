import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setError, clearError, signupUser } from '../store/signupSlice'; // Adjust import paths

export default function SignupStep2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local form state
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // default US
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');

  // Get errors and loading from Redux state (adjust path as needed)
  const errors = useSelector((state) => state.signup.errors || {});
  const loading = useSelector((state) => state.signup.loading);

  // Get step1 data saved in Redux from previous step
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
    // If you want to go back to Step 1, either:
    // 1) Navigate to step 1 route:
    navigate('/signup-step1');
    // OR
    // 2) If step management is internal, use setStep passed as prop or in context
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

    dispatch(signupUser(signupData))
      .unwrap()
      .then(() => {
        navigate('/dashboard');
      })
      .catch(() => {
        // Error handling is assumed inside thunk/slice
      });
  };

  return (
    <div className="signup-step2-container max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) dispatch(clearError('fullName'));
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.fullName && <p className="text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        <div className="mb-4 flex space-x-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="+1">+1 (US)</option>
            <option value="+44">+44 (UK)</option>
            <option value="+91">+91 (India)</option>
          </select>
          <input
            type="tel"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (errors.phoneNumber) dispatch(clearError('phoneNumber'));
            }}
            className="flex-grow border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {errors.phoneNumber && <p className="text-red-500 mb-4">{errors.phoneNumber}</p>}

        <div className="mb-4">
          <input
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              if (errors.dob) dispatch(clearError('dob'));
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.dob && <p className="text-red-500 mt-1">{errors.dob}</p>}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white rounded ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Submitting...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}
