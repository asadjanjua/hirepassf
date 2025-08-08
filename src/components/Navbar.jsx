import React from 'react';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 shadow-md'>
      <img src='/logo.svg' alt='Logo' className='w-20 h-20' />
      <p className='text-xl font-semibold'>Recruit Elite Remote Developers!</p>
    </div>
  );
};

export default Navbar;
