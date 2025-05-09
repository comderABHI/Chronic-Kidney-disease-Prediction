// src/components/CkdInfo.jsx
import React from 'react';

const CkdInfo = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">Understanding Chronic Kidney Disease</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-lg text-blue-700 mb-2">What is CKD?</h3>
          <p>
            Chronic Kidney Disease (CKD) is a condition characterized by a gradual loss of kidney function over time.
            Your kidneys filter wastes and excess fluids from your blood, which are then excreted in your urine.
            When chronic kidney disease reaches an advanced stage, dangerous levels of fluid, electrolytes, and
            wastes can build up in your body.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800">Common Symptoms</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Fatigue and weakness</li>
              <li>• Sleep problems</li>
              <li>• Decreased appetite</li>
              <li>• Swelling in feet and ankles</li>
              <li>• Muscle cramps</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="font-medium text-green-800">Risk Factors</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Diabetes</li>
              <li>• High blood pressure</li>
              <li>• Heart disease</li>
              <li>• Family history of kidney disease</li>
              <li>• Age over 60</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h4 className="font-medium text-purple-800">Key Indicators</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• eGFR levels</li>
              <li>• Creatinine</li>
              <li>• Blood urea nitrogen</li>
              <li>• Albumin-to-creatinine ratio</li>
              <li>• Protein in urine</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg text-blue-700 mb-2">Why Early Detection Matters</h3>
          <p>
            Early detection and treatment can often keep chronic kidney disease from getting worse.
            When kidney disease progresses, it may eventually lead to kidney failure, which requires
            dialysis or a kidney transplant to maintain life.
          </p>
        </div>
        
        <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
          <h3 className="font-medium text-lg text-yellow-800 mb-2">Important Note</h3>
          <p className="text-yellow-700">
            This tool is designed to help identify potential risk factors for CKD based on your medical report.
            It does not replace professional medical advice, diagnosis, or treatment. Always consult with a
            healthcare professional regarding any medical concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CkdInfo;