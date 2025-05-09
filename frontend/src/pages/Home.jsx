// src/pages/Home.jsx
import React, { useState } from 'react';
import ReportUploader from '../components/ReportUploader';
import CkdInfo from '../components/CkdInfo';
import LoadingIndicator from '../components/LoadingIndicator';
import ResultsDisplay from '../components/ResultsDisplay';
import { processDocument } from '../utils/documentProcessor';
import { predictCkd } from '../services/predictionService';

const Home = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [processingStage, setProcessingStage] = useState('');

  const handleReportUpload = async (file) => {
    try {
      setIsProcessing(true);
      setError(null);
      setResults(null);
      
      // Stage 1: OCR Processing
      setProcessingStage('Analyzing medical report...');
      const extractedData = await processDocument(file);
      
      // Stage 2: ML Prediction
      setProcessingStage('Predicting CKD risk...');
      const predictionResult = await predictCkd(extractedData);
      
      setResults(predictionResult);
    } catch (err) {
      console.error('Error processing report:', err);
      setError('There was an error processing your medical report. Please try again with a clearer image.');
    } finally {
      setIsProcessing(false);
    }
  };
  // const handleReportUpload = async (file) => {
  //   try {
  //     setIsProcessing(true);
  //     setError(null);
  //     setResults(null);
      
  //     // Stage 1: OCR Processing
  //     setProcessingStage('Analyzing medical report...');
  //     const extractedData = await processDocument(file);
  
  //     // ✅ Validate the extracted data
  //     const requiredFields = ['SerumCreatinine', 'GFR', 'BUNLevels', 'HbA1c'];
  //     const hasValidData = requiredFields.some(field => extractedData?.[field] !== undefined);
  
  //     if (!hasValidData) {
  //       setError('The uploaded document does not appear to contain valid medical report data. Please upload a proper lab report.');
  //       setIsProcessing(false);
  //       return;
  //     }
  
  //     // Stage 2: ML Prediction
  //     setProcessingStage('Predicting CKD risk...');
  //     const predictionResult = await predictCkd(extractedData);
  
  //     setResults(predictionResult);
  //   } catch (err) {
  //     console.error('Error processing report:', err);
  //     setError('There was an error processing your medical report. Please try again with a clearer image or PDF.');
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };
  

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Chronic Kidney Disease Predictor
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Early detection for better kidney health outcomes
          </p>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-lg">
              Upload your medical report and get an instant assessment of CKD risk factors.
              Our advanced machine learning algorithm analyzes your lab results to help
              identify potential kidney issues early.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                Upload Your Report
              </h2>
              <ReportUploader onUpload={handleReportUpload} disabled={isProcessing} />
              
              {isProcessing && (
                <div className="mt-6">
                  <LoadingIndicator message={processingStage} />
                </div>
              )}

              {error && (
                <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Results or Info */}
          <div className="lg:col-span-2">
            {results ? (
              <ResultsDisplay results={results} />
            ) : (
              <CkdInfo />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;