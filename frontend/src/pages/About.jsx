// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">About CKD Predictor</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-3">Our Mission</h2>
              <p>
                The CKD Predictor tool aims to provide early detection of potential Chronic Kidney Disease risk factors
                by analyzing medical reports through machine learning and artificial intelligence. Our goal is to help
                individuals identify potential kidney issues before they progress to more serious stages.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-3">How It Works</h2>
              <p className="mb-4">
                Our system uses a combination of optical character recognition (OCR) technology and machine learning algorithms
                to analyze your medical reports:
              </p>
              
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <span className="font-medium">Upload Medical Report:</span>
                  <span className="text-gray-700 ml-2">
                    You upload an image or PDF of your medical lab report.
                  </span>
                </li>
                <li>
                  <span className="font-medium">Text Extraction:</span>
                  <span className="text-gray-700 ml-2">
                    Our OCR technology extracts the text and identifies relevant medical parameters.
                  </span>
                </li>
                <li>
                  <span className="font-medium">AI Analysis:</span>
                  <span className="text-gray-700 ml-2">
                    Our machine learning model analyzes the parameters to identify potential CKD risk factors.
                  </span>
                </li>
                {/* <li>
                  <span className="font-medium">Results & Recommendations:</span>
                  <span className="text-gray-700 ml-2">
                    You receive personalized results and recommendations based on the analysis.
                  </span>
                </li> */}
              </ol>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-2xl font-semibold text-blue-700 mb-3">Important Disclaimer</h2>
              <p>
                This tool is designed for educational and informational purposes only. It is not intended to be a substitute 
                for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other 
                qualified health provider with any questions you may have regarding a medical condition.
              </p>
              <p className="mt-2">
                The predictions and recommendations provided by this tool are based on general patterns identified from 
                medical data and should always be verified by healthcare professionals.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-3">Privacy & Security</h2>
              <p>
                We prioritize your privacy and the security of your medical information. All uploaded reports are 
                processed securely and are not stored permanently on our servers. The data extraction happens in 
                your browser when possible, and any server communications are encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;