// src/utils/documentProcessor.js
import { createWorker } from 'tesseract.js';
import { extractParameters } from './parameterExtractor';

// PDF.js is imported in HTML or you can install and import pdf.js

export const processDocument = async (file) => {
  if (file.type.includes('pdf')) {
    return await processPdf(file);
  } else if (file.type.includes('image')) {
    return await processImage(file);
  } else {
    throw new Error('Unsupported file type. Please upload an image or PDF.');
  }
};

const processImage = async (imageFile) => {
  try {
    // Create Tesseract worker
    const worker = await createWorker();
    
    // Initialize worker with English language
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    // Process the image
    const { data } = await worker.recognize(imageFile);
    
    // Terminate worker
    await worker.terminate();
    
    // Extract medical parameters from OCR text
    const parameters = extractParameters(data.text);
    
    return parameters;
  } catch (error) {
    console.error('Image OCR processing error:', error);
    throw new Error('Failed to process the image. Please try again with a clearer image.');
  }
};

const processPdf = async (pdfFile) => {
  try {
    // Convert PDF to text (this is a simplified version)
    // In a real implementation, you would use PDF.js to extract text or convert to images for OCR
    
    // For demonstration purposes, we'll read the PDF as text
    const fileReader = new FileReader();
    
    return new Promise((resolve, reject) => {
      fileReader.onload = async (event) => {
        try {
          // This is where you'd use PDF.js to process the PDF
          // For now, we'll simulate getting text from the PDF
          const pdfText = "This is simulated extracted text from PDF. Creatinine: 1.2 mg/dL, BUN: 18 mg/dL, eGFR: 75 mL/min, Albumin: 4.0 g/dL, Glucose: 95 mg/dL";
          
          // Extract parameters from text
          const parameters = extractParameters(pdfText);
          
          resolve(parameters);
        } catch (error) {
          reject(error);
        }
      };
      
      fileReader.onerror = () => {
        reject(new Error('Failed to read the PDF file.'));
      };
      
      fileReader.readAsArrayBuffer(pdfFile);
    });
  } catch (error) {
    console.error('PDF processing error:', error);
    throw new Error('Failed to process the PDF. Please try again with a different file.');
  }
};