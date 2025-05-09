// src/pages/Results.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Check if results were passed through location state
    if (location.state && location.state.results) {
      setResults(location.state.results);
    } else {
      // If no results, redirect back to home
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  // Format probability as percentage
  const formatProbability = (probability) => {
    return Math.round(probability * 100);
  };

  // Determine risk level and styling based on probability
  const getRiskInfo = (probability) => {
    if (probability >= 0.7) {
      return {
        level: 'High',
        color: 'bg-red-100 text-red-800 border-red-200',
        progressColor: 'bg-red-500'
      };
    } else if (probability >= 0.3) {
      return {
        level: 'Moderate',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        progressColor: 'bg-yellow-500'
      };
    } else {
      return {
        level: 'Low',
        color: 'bg-green-100 text-green-800 border-green-200',
        progressColor: 'bg-green-500'
      };
    }
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="p-8 bg-white rounded-xl shadow-md">
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const { prediction, probability, parameters, recommendations } = results;
  const riskPercentage = formatProbability(probability);
  const riskInfo = getRiskInfo(probability);

  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">CKD Risk Assessment Results</h1>
            <p className="text-blue-100">Analysis of your medical report parameters</p>
          </div>

          {/* Risk Assessment */}
          <div className="p-6">
            <div className={`p-6 rounded-lg border ${riskInfo.color} mb-8`}>
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
                
                {/* Progress Circle */}
                <div className="relative w-40 h-40 mb-6">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#e5e7eb" 
                      strokeWidth="10" 
                    />
                    
                    {/* Foreground Circle */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke={riskInfo.progressColor.replace('bg-', 'text-')} 
                      strokeWidth="10" 
                      strokeDasharray={`${probability * 283} 283`} 
                      strokeDashoffset="0" 
                      strokeLinecap="round" 
                      transform="rotate(-90 50 50)" 
                      className="transition-all duration-1000 ease-out"
                    />
                    
                    {/* Percentage Text */}
                    <text 
                      x="50" 
                      y="50" 
                      textAnchor="middle" 
                      dy=".3em" 
                      fontSize="24" 
                      fontWeight="bold"
                    >
                      {riskPercentage}%
                    </text>
                  </svg>
                </div>
                
                <div className="text-lg font-bold mb-2">{riskInfo.level} Risk</div>
                <p className="text-center">
                  {prediction === 1 
                    ? 'Based on the analysis of your medical report, indicators suggest a presence of chronic kidney disease risk factors.' 
                    : 'Based on the analysis of your medical report, indicators appear within normal ranges.'}
                </p>
              </div>
            </div>

            {/* Detailed Parameters */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Medical Parameters</h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(parameters).map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                      <div className="text-gray-500 text-sm capitalize">{key}</div>
                      <div className="font-medium">{value}</div>
                    </div>
                  ))}
                </div>

                {Object.keys(parameters).length === 0 && (
                  <p className="text-gray-500 italic">No specific parameters were extracted from the report.</p>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Recommendations</h2>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <ul className="space-y-3">
                  {recommendations.map((recommendation, index) => (
                    <li key={index} className="flex">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>

                {(!recommendations || recommendations.length === 0) && (
                  <p className="text-gray-500 italic">No specific recommendations available.</p>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Important:</span> This analysis is for informational purposes only and is not a medical diagnosis.
                Please consult with a healthcare professional for proper interpretation of your results.
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-center mt-8">
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Analyze Another Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;