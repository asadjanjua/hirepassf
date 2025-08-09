import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupStep1 } from '../store/thunks/signupThunks';
import { useNavigate, Link } from 'react-router-dom';
import { setError, clearError } from '../store/slices/errorSlice';

const SignupStep1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.error.errors);
  const loading = useSelector((state) => state.error.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateInputs = () => {
    let hasError = false;

    dispatch(clearError('email'));
    dispatch(clearError('password'));
    dispatch(clearError('confirmPassword'));

    if (!email.trim()) {
      dispatch(setError({ field: 'email', message: 'Email is required' }));
      hasError = true;
    } else if (
      !/^(?=[a-zA-Z0-9.]*[a-zA-Z])(?=[a-zA-Z0-9.]*[0-9])(?=[a-zA-Z0-9.]*\.)[a-zA-Z0-9.]+@gmail\.com$/.test(email)
    ) {
      dispatch(
        setError({
          field: 'email',
          message: 'Please enter a valid Gmail address, e.g. example1.a@gmail.com',
        })
      );
      hasError = true;
    }

    if (!password) {
      dispatch(setError({ field: 'password', message: 'Password is required' }));
      hasError = true;
    } else if (password.length < 8) {
      dispatch(setError({ field: 'password', message: 'Password must be at least 8 characters' }));
      hasError = true;
    } else if (
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/.test(password)
    ) {
      dispatch(
        setError({
          field: 'password',
          message: 'Password must contain at least one uppercase letter and one special character',
        })
      );
      hasError = true;
    }

    if (password !== confirmPassword) {
      dispatch(setError({ field: 'confirmPassword', message: 'Passwords do not match' }));
      hasError = true;
    }

    if (confirmPassword === '') {
      dispatch(setError({ field: 'confirmPassword', message: 'Confirm Password is required' }));
      hasError = true;
    }

    return !hasError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      dispatch(signupStep1({ email, password })).catch((error) => {
        if (error.message) {
          dispatch(setError({ field: 'general', message: error.message }));
        }
      });
    }
  };

  return (
    <div className="flex w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Sign Up To Get Hired Globally</h2>
          <p className="text-gray-600 mt-2">
            Please enter your account information
          </p>
        </div>

        {/* Email */}
        <label className="block mb-1 font-medium text-gray-700">Email</label>
        <div className="relative mb-1">
          <img
            src="/email.svg"
            alt="Email icon"
            className="absolute left-3 top-3 w-5 h-5 text-gray-400"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) dispatch(clearError('email'));
            }}
            className="w-full border border-gray-300 rounded px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mb-4">{errors.email}</p>}

        {/* Password */}
        <label className="block mb-1 font-medium text-gray-700">Password</label>
        <div className="relative mb-1">
          <img
            src="/lock.svg"
            alt="Password icon"
            className="absolute left-3 top-3 w-5 h-5 text-gray-400"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) dispatch(clearError('password'));
            }}
            className="w-full border border-gray-300 rounded px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        {errors.password && <p className="text-red-500 text-xs mb-4">{errors.password}</p>}

        {/* Confirm Password */}
        <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
        <div className="relative mb-1">
          <img
            src="/lock.svg"
            alt="Password icon"
            className="absolute left-3 top-3 w-5 h-5 text-gray-400"
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) dispatch(clearError('confirmPassword'));
            }}
            className="w-full border border-gray-300 rounded px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mb-4">{errors.confirmPassword}</p>
        )}

        {errors.general && <p className="text-red-500 text-xs mb-4">{errors.general}</p>}

        <button
          type="submit"
          disabled={loading.step1}
          className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition disabled:opacity-50 font-medium"
        >
          {loading.step1 ? 'Processing...' : 'Next'}

        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-emerald-500 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupStep1;
