import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/thunks/authThunks';
import { setError, clearError } from '../store/slices/errorSlice';
import CustomPic from './CustomPic';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.error?.errors || {});
  const loading = useSelector((state) => state.error?.loading || { login: false });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [auth?.isAuthenticated, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearError('email'));
    dispatch(clearError('password'));

    let hasError = false;
    if (!email) {
      dispatch(setError({ field: 'email', message: 'Email is required' }));
      hasError = true;
    }
    if (!password) {
      dispatch(setError({ field: 'password', message: 'Password is required' }));
      hasError = true;
    }
    if (hasError) return;

    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err) {
      if (err?.errors) {
        if (err.errors.email)
          dispatch(setError({ field: 'email', message: err.errors.email }));
        if (err.errors.password)
          dispatch(setError({ field: 'password', message: err.errors.password }));
      } else if (err?.message) {
        console.error('Login failed:', err.message);
      } else {
        console.error('Login failed', err);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT COLUMN - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 lg:px-20 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Login to your account</h2>
          <p className="text-gray-600 mt-2">
            Welcome to <span className="font-semibold text-emerald-600">HirePass</span> developer portal.
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative mt-1">
              <img
                src="/email.svg"
                alt="Email Icon"
                className="absolute left-3 top-2.5 w-5 h-5 pointer-events-none"
              />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors?.email) dispatch(clearError('email'));
                }}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            {errors?.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <img
                src="/lock.svg"
                alt="Password Icon"
                className="absolute left-3 top-2.5 w-5 h-5 pointer-events-none"
              />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors?.password) dispatch(clearError('password'));
                }}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            {errors?.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading?.login}
              className={`py-2 px-4 rounded-lg text-white font-semibold transition ${
                loading?.login
                  ? 'bg-emerald-300 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {loading?.login ? 'Logging in...' : 'Login'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-emerald-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-emerald-600 font-semibold hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>

      {/* RIGHT COLUMN - Custom Picture */}
      <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center p-8">
        <CustomPic />
      </div>
    </div>
  );
};

export default Login;
