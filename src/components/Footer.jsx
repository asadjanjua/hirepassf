import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left - Copyright */}
        <p className="text-sm text-gray-600">
          © 2025 <span className="font-semibold text-gray-800">Bema</span>. All rights reserved.
        </p>
  
        {/* Right - Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200"
          >
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
