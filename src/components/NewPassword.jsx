import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordThunk } from '../store/thunks/authThunks';

const NewPassword = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.forgotPasswordEmail);
  const error = useSelector((state) => state.auth.error); // error from slice
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      // We can dispatch a slice action to set error globally if needed
      return;
    }
    if (password !== confirm) {
      // Same here: store mismatch error in slice if you want global control
      return;
    }

    dispatch(resetPasswordThunk({ email, password }));
  };

  return (
    <div className="flex w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
        <p className="text-gray-600 mt-2">
          Please enter your new password below
        </p>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <img
            src="/lock.svg"
            alt="Password icon"
            className="absolute left-3 top-3 w-5 h-5 text-gray-400"
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="relative">
          <img
            src="/lock.svg"
            alt="Password icon"
            className="absolute left-3 top-3 w-5 h-5 text-gray-400"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-300 rounded px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition font-medium"
        >
          Reset Password
        </button>
      </form>
  </div>
  );
};

export default NewPassword;
