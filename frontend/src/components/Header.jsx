// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        <Link to="/" className="flex items-center">
          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="currentColor"/>
            <path d="M16.8889 2H7.11111C4.84222 2 3 3.84222 3 6.11111V17.8889C3 20.1578 4.84222 22 7.11111 22H16.8889C19.1578 22 21 20.1578 21 17.8889V6.11111C21 3.84222 19.1578 2 16.8889 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="ml-2 text-xl font-semibold text-blue-800">CKD Predictor</span>
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;