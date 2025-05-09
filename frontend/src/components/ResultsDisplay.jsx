// //3rd update
// import React from 'react';

// const ResultsDisplay = ({ results }) => {
//   if (!results || !results.prediction) {
//     return <div className="bg-white rounded-xl shadow-md p-6">Loading results...</div>;
//   }

//   // Extract from nested prediction object
//   const { probability, parameters, result: prediction, risk_level, recommendations } = results.prediction;

//   // Format probability as percentage, handle undefined
//   const riskPercentage = typeof probability === "number" ? Math.round(probability * 100) : "N/A";

//   // Determine risk level and styling
//   let riskLevel, riskColor;
//   if (probability >= 0.7) {
//     riskLevel = 'High';
//     riskColor = 'bg-red-100 text-red-800 border-red-200';
//   } else if (probability >= 0.3) {
//     riskLevel = 'Moderate';
//     riskColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
//   } else {
//     riskLevel = 'Low';
//     riskColor = 'bg-green-100 text-green-800 border-green-200';
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-2xl font-semibold text-blue-800 mb-6">Analysis Results</h2>
//       <div className={`p-6 rounded-lg border ${riskColor} mb-6`}>
//         <div className="flex flex-col items-center">
//           <h3 className="text-xl font-medium mb-2">CKD Risk Assessment</h3>
//           <div className="text-5xl font-bold mb-2">{riskPercentage}%</div>
//           <div className="text-lg">{riskLevel} Risk</div>
//           <p className="mt-4 text-center">
//             {prediction === "positive"
//               ? 'Based on the analysis of your medical report, indicators suggest a presence of chronic kidney disease risk factors.'
//               : 'Based on the analysis of your medical report, indicators appear within normal ranges.'}
//           </p>
//         </div>
//       </div>

//       {/* Parameters */}
//       <div className="mb-6">
//         <h3 className="text-xl font-medium text-blue-700 mb-3">Detected Parameters</h3>
//         <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {parameters && Object.entries(parameters).map(([key, value]) => (
//               <div key={key} className="bg-white p-3 rounded border border-gray-100 shadow-sm">
//                 <div className="text-gray-500 text-sm">{key}</div>
//                 <div className="font-medium">{value}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Recommendations */}
//       <div>
//         <h3 className="text-xl font-medium text-blue-700 mb-3">Recommendations</h3>
//         <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
//           <ul className="space-y-2">
//             {recommendations && recommendations.map((recommendation, index) => (
//               <li key={index} className="flex">
//                 <span className="text-blue-500 mr-2">•</span>
//                 <span>{recommendation}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="mt-8 text-center">
//         <p className="text-sm text-gray-500 italic">
//           This analysis is for informational purposes only and is not a medical diagnosis.
//           Please consult with a healthcare professional for proper interpretation of your results.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ResultsDisplay;
//4th update
import React from 'react';

const ResultsDisplay = ({ results }) => {
  if (!results || !results.prediction) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
        Loading results...
      </div>
    );
  }

  // Extract from nested prediction object
  const { probability, result: prediction, risk_level } = results.prediction;

  // Format probability as percentage, handle undefined
  const riskPercentage =
    typeof probability === "number" ? Math.round(probability * 100) : "N/A";

  // Determine risk level and styling
  let riskLevel, riskColor;
  if (probability >= 0.7) {
    riskLevel = 'High';
    riskColor = 'bg-red-100 text-red-800 border-red-300';
  } else if (probability >= 0.3) {
    riskLevel = 'Moderate';
    riskColor = 'bg-yellow-100 text-yellow-800 border-yellow-300';
  } else {
    riskLevel = 'Low';
    riskColor = 'bg-green-100 text-green-800 border-green-300';
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
        Analysis Results
      </h2>
      <div className={`p-8 rounded-lg border-2 ${riskColor} mb-8 shadow-inner`}>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            CKD Risk Assessment
          </h3>
          <div className="text-6xl font-extrabold mb-2">{riskPercentage}%</div>
          <div className="text-lg font-semibold">{riskLevel} Risk</div>
          <p className="mt-4 text-center text-gray-700">
            {prediction === "positive"
              ? 'Based on the analysis of your medical report, indicators suggest a presence of chronic kidney disease risk factors.'
              : 'Based on the analysis of your medical report, indicators appear within normal ranges.'}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 italic">
          This analysis is for informational purposes only and is not a medical diagnosis.<br />
          Please consult with a healthcare professional for proper interpretation of your results.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
