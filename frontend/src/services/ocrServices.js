// src/services/ocrServices.js

import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import Tesseract from 'tesseract.js';

// Set workerSrc for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extract text from PDF file using Tesseract.js
 * @param {File} pdfFile - PDF file uploaded by user
 * @returns {Promise<string>} - Extracted text
 */
export const extractTextFromPdf = async (pdfFile) => {
  const pdfData = await pdfFile.arrayBuffer(); // Read PDF as array buffer

  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
  let fullText = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    const viewport = page.getViewport({ scale: 2 }); // Higher scale = better quality
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise; // Render page to canvas

    const imageDataUrl = canvas.toDataURL('image/png'); // Get image data

    // Perform OCR on the canvas image
    const { data: { text } } = await Tesseract.recognize(
      imageDataUrl,
      'eng', // Language
      { logger: m => console.log(m) } // Optional progress logs
    );

    fullText += text + '\n'; // Add extracted text
  }

  return fullText;
};
