
import fuzzysort from 'fuzzysort';

const parametersToExtract = [
  { name: 'creatinine', keywords: ['creatinine', 'scr'], unit: 'mg/dL' },
  { name: 'eGFR', keywords: ['egfr', 'estimated glomerular filtration rate'], unit: 'mL/min/1.73m²' },
  { name: 'BUN', keywords: ['bun', 'blood urea nitrogen'], unit: 'mg/dL' },
  { name: 'albumin', keywords: ['albumin'], unit: 'g/dL' },
  { name: 'urine protein', keywords: ['urine protein', 'proteinuria', 'protein in urine'], unit: 'mg/dL' },
  { name: 'ACR', keywords: ['acr', 'albumin-to-creatinine ratio'], unit: 'mg/g' },
  { name: 'hemoglobin', keywords: ['hemoglobin', 'hgb'], unit: 'g/dL' },
  { name: 'potassium', keywords: ['potassium', 'k+'], unit: 'mEq/L' },
  { name: 'calcium', keywords: ['calcium', 'ca'], unit: 'mg/dL' },
  { name: 'phosphorus', keywords: ['phosphorus', 'phosphate'], unit: 'mg/dL' },
];

export const extractParameters = (text) => {
  const parameters = {};

  parametersToExtract.forEach(({ name, keywords, unit }) => {
    const bestMatch = fuzzysort.go(name, text.split(/\n/), { threshold: -1000, allowTypo: true });

    if (bestMatch.total > 0) {
      bestMatch.forEach(match => {
        const line = match.target;
        const numberMatch = line.match(/([\d.]+)/);

        if (numberMatch && numberMatch[1]) {
          const value = parseFloat(numberMatch[1]);
          if (!isNaN(value)) {
            parameters[name] = `${value} ${unit}`;
          }
        }
      });
    } else {
      for (const keyword of keywords) {
        const regex = new RegExp(`${keyword}[:\\s]*([0-9.]+)`, 'i');
        const match = text.match(regex);
        if (match && match[1]) {
          const value = parseFloat(match[1]);
          if (!isNaN(value)) {
            parameters[name] = `${value} ${unit}`;
            break;
          }
        }
      }
    }
  });
  
  if (text.match(/diabetes/i)) {
    parameters.diabetes = 'Mentioned';
  }

  if (text.match(/hypertension|high blood pressure/i)) {
    parameters.hypertension = 'Mentioned';
  }

  return parameters;
};
