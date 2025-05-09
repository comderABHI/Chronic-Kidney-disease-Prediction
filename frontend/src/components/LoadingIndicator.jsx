// src/components/LoadingIndicator.jsx
import React from 'react';

const LoadingIndicator = ({ message }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-blue-200"></div>
        <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-blue-800 font-medium">{message || 'Processing...'}</p>
    </div>
  );
};

export default LoadingIndicator;