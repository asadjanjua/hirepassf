import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupStep1 } from '../store/thunks/signupThunks'; // assuming this is your thunk
import { useNavigate, Link } from 'react-router-dom';

const SignupStep1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateInputs = () => {
    let hasError = false;
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Email validation
    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (
      !/^(?=[a-zA-Z0-9.]*[a-zA-Z])(?=[a-zA-Z0-9.]*[0-9])(?=[a-zA-Z0-9.]*\.)[a-zA-Z0-9.]+@gmail\.com$/.test(email)
    ) {
      setEmailError('Please enter a valid Gmail address, e.g. example1.a@gmail.com');
      hasError = true;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      hasError = true;
    } else if (
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/.test(password)
    ) {
      setPasswordError('Password must contain at least one uppercase letter and one special character');
      hasError = true;
    }

    // Confirm password match
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    return !hasError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      // Dispatch the signup step 1 action with email and password
      dispatch(signupStep1({ email, password }));

      // Navigate to next step or desired page
      navigate('/signup-step2');
    }
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Sign Up To Get Hired Globally</h2>
        <p className="mb-6">Please enter your account information</p>

        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
        />
        {emailError && <p className="text-red-500 mb-2">{emailError}</p>}

        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
        />
        {passwordError && <p className="text-red-500 mb-2">{passwordError}</p>}

        <label className="block mb-1 font-medium">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
        />
        {confirmPasswordError && <p className="text-red-500 mb-2">{confirmPasswordError}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition"
        >
          Next
        </button>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupStep1;