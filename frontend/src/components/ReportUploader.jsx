// src/components/ReportUploader.jsx
import React, { useRef, useState } from 'react';

const ReportUploader = ({ onUpload, disabled }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0] && !disabled) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0] && !disabled) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file) => {
    setSelectedFile(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    if (selectedFile && !disabled) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        onClick={disabled ? null : triggerFileInput}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*, application/pdf"
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="mb-3">
          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
        </div>
        
        {selectedFile ? (
          <div className="text-sm font-medium">
            Selected: <span className="text-blue-600">{selectedFile.name}</span>
          </div>
        ) : (
          <div>
            <p className="font-medium text-gray-700">
              Drag & drop your medical report here
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse (PDF, JPG, PNG)
            </p>
          </div>
        )}
      </div>

      {selectedFile && (
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className={`mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors ${
            disabled ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {disabled ? 'Processing...' : 'Analyze Report'}
        </button>
      )}
    </div>
  );
};

export default ReportUploader;