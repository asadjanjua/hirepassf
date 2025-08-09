import React from 'react';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 shadow-md bg-white'>
      <img src='/logo.svg' alt='Logo' className='w-24 h-12' />
      <p className='text-xl font-semibold text-gray-800'>Recruit Elite Remote Developers!</p>
    </div>
  );
};

export default Navbar;
