// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">CKD Predictor</h3>
            <p className="text-blue-200 text-sm mt-1">
              Early detection for better kidney health
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-blue-200">
              © {new Date().getFullYear()} CKD Predictor. All rights reserved.
            </p>
            <p className="text-xs text-blue-300 mt-1">
              This tool is for educational purposes only and is not a substitute for medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;